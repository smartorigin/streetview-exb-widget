import type { Point, Polygon } from 'esri/geometry'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import type { AllWidgetProps } from 'jimu-core'
import type { WidgetConfig } from '../config'
import ExpandedStreetView from '././views/ExpandedStreetView'
import './css/main.css'
import React from 'react'
// Import React for compatibility with older exb versions
import FloatingAlerts from './components/FloatingAlerts'
import useWidgetViewState from './hooks/useWidgetViewState'
import MapService from './services/engine/MapService'
import StreetViewApiService from './services/engine/StreetViewApiService'
import defaultMessages from './translations/default'
import type { AlertType, WidgetViewType } from './types/general'
import { personViewSymbol } from './utils/cim-symbols'
import clsx from './utils/clsx'
import ControlPanelView from './views/ControlPanelView'
import StreetView from './views/StreetView'

export default function Widget(props: AllWidgetProps<WidgetConfig>) {
  /**
   * Initialize view state
   */
  const widgetViewState = useWidgetViewState(props.config && props.config.initialViewState === 'expanded')

  /**
   * Controls whether or not the widget click on map function is active, tied to control panel state
   */
  const [isClickActive, setIsWidgetActive] = React.useState<boolean>(
    props.config && props.config.initialControlPanelState === 'on'
  )

  const [isGoogleApiKeyFound, setIsGoogleApiKeyFound] = React.useState<boolean>(false)

  const [isMapSelected, setIsMapSelected] = React.useState<boolean>(false)

  /**
   * Controls displayed widget floating alerts
   */
  const [alerts, setAlerts] = React.useState<AlertType[]>([])

  const [mapViewReady, setMapViewReady] = React.useState<boolean>(false)

  const [mapService, setMapService] = React.useState<MapService | null>(null)

  const [streetViewApiService] = React.useState(
    () => new StreetViewApiService(undefined, props.config.streetViewApiParams)
  )

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

  React.useEffect(() => {
    // TODO: replace this with css if possible
    const widgetRoot = document.querySelector('.streetview-widget-root')
    const widgetHiddenRoot: HTMLElement = widgetRoot.closest('.is-widget')
    widgetHiddenRoot.style.cssText = 'pointer-events: none !important'
  }, [])

  /**
   * Verify map is selected
   */
  React.useEffect(() => {
    if (!props.useMapWidgetIds.length) {
      setIsMapSelected(false)
      setAlerts([
        ...alerts,
        {
          id: 'mapNotSelected',
          text: props.intl.formatMessage({
            id: 'mapNotSelectedErrorLabel',
            defaultMessage: defaultMessages.mapNotSelectedErrorLabel
          }),
          type: 'error',
          open: true
        }
      ])
    } else {
      setIsMapSelected(true)
      setAlerts(alerts.filter((a) => a.id !== 'mapNotSelected'))
    }
  }, [props.useMapWidgetIds])

  /**
   * Setup custom popup actions
   */
  React.useEffect(() => {
    if (mapViewReady && mapService?.jmv) {
      if (props.config.isPopupActionEnabled) mapService.setPopupActions()
    }
  }, [mapService, mapViewReady, props.config.isPopupActionEnabled])

  /**
   * Setup Google API Key
   */
  React.useEffect(() => {
    if (!props.config.googleApiKey?.trim()) {
      // Key found
      setIsGoogleApiKeyFound(false)
      setAlerts([
        ...alerts,
        {
          id: 'googleApiKeyNotFound',
          text: props.intl.formatMessage({
            id: 'googleApiKeyNotFoundErrorLabel',
            defaultMessage: defaultMessages.googleApiKeyNotFoundErrorLabel
          }),
          type: 'error',
          open: true
        }
      ])
    } else {
      // Key not found
      setIsGoogleApiKeyFound(true)
      setAlerts(alerts.filter((a) => a.id !== 'googleApiKeyNotFound'))
      streetViewApiService.setApiKey(props.config.googleApiKey?.trim() || undefined)
    }
  }, [props.config.googleApiKey])

  /**
   * Watch & update streetview api params
   */
  React.useEffect(() => {
    if (props.config.streetViewApiParams) {
      streetViewApiService.setApiParams(props.config.streetViewApiParams)
    }
  }, [props.config.streetViewApiParams])

  /**
   * Handle actions
   */
  React.useEffect(() => {
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
            // Use deprecated centroid proprety instead of new centroidOperator for compatibility with older exb versions
            const { latitude, longitude } = (geometry as Polygon).centroid
            handleStreetViewRequest(latitude, longitude)
          } else if (geometry.type === 'point') {
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
  }, [mapService, mapViewReady, streetViewApiService, widgetViewState.isExpanded, isClickActive, props.config])

  /**
   * Clean up graphic point on certain view state changes
   */
  React.useEffect(() => {
    if (mapService && (widgetViewState.view === 'default' || !widgetViewState.isVisible)) {
      mapService.removeAllStreetViewGraphicPoints()
    }
  }, [widgetViewState.view, widgetViewState.isVisible, widgetViewState.isExpanded, mapService])

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
              isGoogleApiKeyFound={isGoogleApiKeyFound}
              isMapSelected={isMapSelected}
              setIsWidgetActive={setIsWidgetActive}
            />
          )}
        </>
      )
    }
  }

  return (
    <>
      {props.useMapWidgetIds?.[0] && (
        <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds[0]} onActiveViewChange={activeViewChangeHandler} />
      )}

      {/* Widget Container */}
      <div
        id="streetview-widget-root"
        className={clsx('streetview-widget-root  jimu-widget', widgetViewState.isVisible ? '' : 'd-none')}
      >
        <div
          key={widgetViewState.view}
          className="size-full d-flex flex-column align-items-end justify-content-end gap-4 widget-content-animated"
        >
          <FloatingAlerts alerts={alerts} setAlerts={setAlerts} />
          {renderer(widgetViewState.view)}
        </div>
      </div>
    </>
  )
}
