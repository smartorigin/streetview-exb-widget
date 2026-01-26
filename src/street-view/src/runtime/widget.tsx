import * as centroidOperator from '@arcgis/core/geometry/operators/centroidOperator.js'
import type { Point, Polygon } from 'esri/geometry'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import type { AllWidgetProps } from 'jimu-core'
import { Alert, Message } from 'jimu-ui'
import { useEffect, useState } from 'react'
import type { WidgetConfig } from '../config'
import ExpandedStreetView from '././views/ExpandedStreetView'
import './css/main.css'
// NOTE: Import react for compatibility with older exb versions
import React from 'react'
import useWidgetViewState from './hooks/useWidgetViewState'
import MapService from './services/engine/MapService'
import StreetViewApiService from './services/engine/StreetViewApiService'
import defaultMessages from './translations/default'
import type { AlertType, MessageType, WidgetViewType } from './types/general'
import { personViewSymbol } from './utils/cim-symbols'
import clsx from './utils/clsx'
import ControlPanelView from './views/ControlPanelView'
import StreetView from './views/StreetView'

export default function Widget(props: AllWidgetProps<WidgetConfig>) {
  /**
   * Initialize widget view state
   */
  const widgetViewState = useWidgetViewState(props.config && props.config.initialViewState === 'expanded')

  /**
   * Controls whether or not the widget click on map function is active, tied to control panel state
   */
  const [isClickActive, setIsWidgetActive] = useState<boolean>(
    props.config && props.config.initialControlPanelState === 'on'
  )

  /**
   * Wether or not the google api key is set/found
   */
  const [isGoogleApiKeyValid, setIsGoogleApiKeyValid] = useState<boolean>(false)

  /**
   * State of the widget's toast component
   */
  const [message, setMessage] = useState<MessageType>({
    open: false,
    message: ''
  })

  /**
   * State of the widget's alert component
   */
  const [alert, setAlert] = useState<AlertType>({
    open: false,
    text: '',
    banner: true
  })

  const [mapViewReady, setMapViewReady] = useState<boolean>(false)

  const [mapService, setMapService] = useState<MapService | null>(null)

  const [streetViewApiService] = useState(() => new StreetViewApiService(undefined, props.config.streetViewApiParams))

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      setMapViewReady(true)
      setMapService(new MapService(jmv))
    }
  }

  /**
   * Handle making the street view request, manage errors, set states...
   */
  const handleStreetViewRequest = async (lat: number, lon: number) => {
    // Reset availability to true to show loading state
    widgetViewState.setIsAvalaible(true)

    // Check if api key has been entered
    if (!streetViewApiService.hasApiKey()) {
      console.error("[clickHandler] Google API key isn't set")
      // Display floating error message
      setMessage((prev) => ({
        ...prev,
        open: true,
        message: props.intl.formatMessage({
          id: 'googleApiKeyNotFoundErrorLabel',
          defaultMessage: defaultMessages.googleApiKeyNotFoundErrorLabel
        }),
        severity: 'error'
      }))
      return
    }

    // Check streetview availability at location
    const isAvailable = await streetViewApiService.checkStreetViewAvailability(lat, lon)
    widgetViewState.setIsAvalaible(isAvailable)

    // Build the urls and add them to the state
    widgetViewState.setStreetViewUrl(streetViewApiService.buildUrl(lat, lon))
    widgetViewState.setStreetViewWebUrl(streetViewApiService.buildWebUrl(lat, lon))

    // This trigger the view
    if (widgetViewState.isExpanded) {
      widgetViewState.setView('expanded')
    } else {
      widgetViewState.setView('streetview')
    }

    // Remove existing street-view graphic point
    mapService.removeAllStreetViewGraphicPoints()

    // Add graphic point to clicked location
    if (props.config.isPositionIconEnabled) {
      mapService.addGraphicPoint(lat, lon, personViewSymbol, 'street-view-graphic')
    }
    return
  }

  /**
   * Set Google API Key
   */
  useEffect(() => {
    if (!props.config || !props.config.googleApiKey?.trim()) {
      /**
       * API Key not found
       */
      setIsGoogleApiKeyValid(false)
      setAlert((prev) => ({
        ...prev,
        text: props.intl.formatMessage({
          id: 'googleApiKeyNotFoundErrorLabel',
          defaultMessage: defaultMessages.googleApiKeyNotFoundErrorLabel
        }),
        type: 'error',
        open: true
      }))
    } else {
      /**
       * API Key found
       */
      setIsGoogleApiKeyValid(true)
      streetViewApiService.setApiKey(props.config.googleApiKey?.trim() || undefined)
      setAlert((prev) => ({
        ...prev,
        open: false
      }))
    }
  }, [props.config])

  /**
   * Handle updating API params
   */
  useEffect(() => {
    if (props.config.streetViewApiParams) {
      streetViewApiService.setApiParams(props.config.streetViewApiParams)
    }
  }, [props.config.streetViewApiParams])

  /**
   * Set custom popup actions
   */
  useEffect(() => {
    if (mapViewReady && mapService?.jmv) {
      if (props.config.isPopupActionEnabled) mapService.setPopupActions()
    }
  }, [mapService, mapViewReady])

  /**
   * Handle map interactions
   */
  useEffect(() => {
    if (mapViewReady && mapService?.jmv) {
      let clickHandler: IHandle
      let popupActionHandler: IHandle

      if (isClickActive) {
        // On map click
        clickHandler = mapService.onClick(
          async (e) => {
            const { latitude, longitude } = e.mapPoint
            handleStreetViewRequest(latitude, longitude)
          },
          // When popup action is enabled and a feature is hit then skip
          { skipOnFeatureHit: props.config.isPopupActionEnabled }
        )
      }

      if (props.config.isPopupActionEnabled) {
        // On custom popup action
        popupActionHandler = mapService.onPopupAction((geometry) => {
          if (geometry.type === 'polygon') {
            // When feature is a polygon get centroid coord
            const { latitude, longitude } = centroidOperator.execute(geometry as Polygon)
            handleStreetViewRequest(latitude, longitude)
          } else if (geometry.type === 'point') {
            // For point get point coord
            const { latitude, longitude } = geometry as Point
            handleStreetViewRequest(latitude, longitude)
          } else {
            // For other features get the extent center coord
            const { latitude, longitude } = geometry.extent.center
            handleStreetViewRequest(latitude, longitude)
          }
        })
      }

      return () => {
        if (clickHandler) clickHandler.remove()
        if (popupActionHandler) popupActionHandler.remove()
      }
    }

    // clean up graphic points
    return () => {
      if (mapService) mapService.removeAllStreetViewGraphicPoints()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapService, mapViewReady, streetViewApiService, widgetViewState.isExpanded, isClickActive, props.config])

  /**
   * Clean up graphic point on certain view state changes
   */
  useEffect(() => {
    if (mapService && (widgetViewState.view === 'default' || !widgetViewState.isVisible)) {
      mapService.removeAllStreetViewGraphicPoints()
    }
  }, [widgetViewState.view, widgetViewState.isVisible, widgetViewState.isExpanded, mapService])

  /**
   * Apply global styling
   */
  useEffect(() => {
    /**
     * Set hidden widget root element pointer event to none
     */
    const widgetRoot = document.querySelector('.streetview-widget-root')
    const widgetHiddenRoot: HTMLElement = widgetRoot.closest('.is-widget')
    widgetHiddenRoot.style.cssText = 'pointer-events: none !important'
  }, [widgetViewState, props.id])

  /**
   * Render the view
   */
  const renderer = (view: WidgetViewType) => {
    if (view === 'streetview') {
      return (
        <StreetView
          url={widgetViewState.streetViewUrl}
          webUrl={widgetViewState.streetViewWebUrl}
          isAvailable={widgetViewState.isAvalaible}
          setView={widgetViewState.setView}
          intl={props.intl}
        />
      )
    } else if (view === 'expanded') {
      return (
        <ExpandedStreetView
          url={widgetViewState.streetViewUrl}
          webUrl={widgetViewState.streetViewWebUrl}
          isAvailable={widgetViewState.isAvalaible}
          setView={widgetViewState.setView}
          setWidgetViewState={widgetViewState.setState}
          intl={props.intl}
        />
      )
    } else if (view === 'default') {
      return (
        <>
          {!props.config || !props.config.isControlPanelEnabled ? (
            <></>
          ) : (
            <ControlPanelView
              isClickActive={isClickActive}
              isGoogleApiKeyValid={isGoogleApiKeyValid}
              setIsWidgetActive={setIsWidgetActive}
            />
          )}
        </>
      )
    }
  }

  return (
    <>
      {/* To get selected map view */}
      {props.useMapWidgetIds?.[0] && (
        <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds[0]} onActiveViewChange={activeViewChangeHandler} />
      )}

      {/* Message Toast */}
      <Message
        className="title3 font-bold"
        message={message.message}
        open={message.open}
        severity={message.severity}
        shape={message.shape}
        autoHideDuration={2000}
        withIcon={true}
        onClose={() => {
          setMessage((prev) => ({
            ...prev,
            open: false
          }))
        }}
      />

      {/* View Container */}
      <div
        id="streetview-widget-root"
        className={clsx('streetview-widget-root  jimu-widget', widgetViewState.isVisible ? '' : 'd-none')}
      >
        <div
          key={widgetViewState.view}
          className="size-full d-flex flex-column align-items-end justify-content-end gap-4 widget-content-animated"
        >
          {/* Floating Error */}
          <Alert
            className="widget-content-animated h-fit"
            style={{
              whiteSpace: 'nowrap'
            }}
            open={alert.open}
            shape="none"
            size="small"
            type={alert.type}
            text={alert.text}
            title={alert.title}
            variant="text"
            withIcon
            aria-live="polite"
            closable
            form="basic"
            onClose={() => {
              setAlert((prev) => ({
                ...prev,
                open: false
              }))
            }}
          />
          {renderer(widgetViewState.view)}
        </div>
      </div>
    </>
  )
}
