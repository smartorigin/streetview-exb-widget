import { CalciteIcon } from 'calcite-components'
import { Button, Loading, LoadingType, MobilePanel } from 'jimu-ui'
// Import react for compatibility with older exb versions
import React, { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import type { IntlShape } from 'react-intl'
import defaultMessages from '../translations/default'
import type { WidgetViewStateType, WidgetViewType } from '../types/general'
import clsx from '../utils/clsx'

interface ExpandedStreetViewProps {
  url: string | null
  webUrl: string | null
  isAvailable: boolean
  setView: Dispatch<SetStateAction<WidgetViewType>>
  setWidgetViewState: Dispatch<SetStateAction<WidgetViewStateType>>
  intl: IntlShape
}

function ExpandedStreetView(props: ExpandedStreetViewProps) {
  const { intl } = props

  /**
   * True when the street view iframe is loading
   */
  const [isStreetViewLoading, setIsStreetViewLoading] = useState<boolean>(false)

  /**
   * Handle loading state
   */
  useEffect(() => {
    if (props.url) {
      setIsStreetViewLoading(true)
    }
  }, [props.url])

  /**
   * Apply custom styling for mobile panel
   */
  useEffect(() => {
    const mobilePanel = document.querySelector('.street-view-mobile-panel')

    const header = mobilePanel.querySelector('.mobile-panel-content-header')
    const contentWrapper = mobilePanel.querySelector('.expand-mobile-panel-transition')
    const content = mobilePanel.querySelector('.exb-mobile-panel-content')
    const slideButton = mobilePanel.querySelector('.expand-mobile-panel-bar')

    // Remove header (includes default close button)
    if (header) {
      ;(header as HTMLElement).style.cssText = 'display: none !important'
    }
    // Remove padding on content and border radius
    if (contentWrapper) {
      ;(contentWrapper as HTMLElement).style.cssText =
        'padding-left: 0px !important; padding-right: 0px !important; border-radius: 0 !important;'
    }
    // Make content take up entire height of panel
    if (content) {
      ;(content as HTMLElement).style.cssText = 'height: 100% !important'
    }
    // Change color of slide button
    if (slideButton) {
      ;(slideButton as HTMLElement).style.cssText = 'background-color: var(--color-primary) !important'
    }

    // Set default panel height to half that of the screen height
    setTimeout(() => {
      if (contentWrapper) {
        ;(contentWrapper as HTMLElement).style.height = `${window.screen.height / 2}px`
      }
    }, 1)
  }, [])

  return (
    <MobilePanel className="street-view-mobile-panel rounded-none" open={true}>
      {/* Street View Iframe Container */}
      <div
        className="position-relative flex-grow-1 size-full bg-white shadow-2xl"
        style={{
          pointerEvents: 'auto'
        }}
      >
        <div className="d-flex gap-3 flex-row" style={{ position: 'absolute', top: 15, right: 15 }}>
          {/* Open in new tab Button */}
          <Button
            icon
            type="primary"
            style={{ zIndex: 10, pointerEvents: 'auto' }}
            aria-label="Open google map at this location"
            onClick={() => {
              window.open(props.webUrl)
            }}
          >
            <CalciteIcon icon="launch2" scale="m" />
          </Button>

          {/* Reduce View Button */}
          <Button
            icon
            type="primary"
            style={{ zIndex: 10, pointerEvents: 'auto' }}
            aria-label="Reduce street view to floating window"
            onClick={() => {
              props.setWidgetViewState((prev) => ({
                ...prev,
                isExpanded: false
              }))
              props.setView('streetview')
            }}
          >
            <CalciteIcon icon="contract" scale="m" />
          </Button>

          {/* Close Street View Button */}
          <Button
            icon
            type="primary"
            style={{ zIndex: 10, pointerEvents: 'auto' }}
            aria-label="Close street view"
            onClick={() => {
              props.setView('default')
            }}
          >
            <CalciteIcon icon="x" scale="m" />
          </Button>
        </div>

        {/* Loading State Overlay */}
        <div
          className={clsx(
            'position-absolute top-0 left-0 size-full d-flex align-items-center justify-content-center',
            isStreetViewLoading && props.isAvailable ? 'visible' : 'd-none invisible'
          )}
          style={{ zIndex: 10 }}
        >
          <Loading className="bg-transparent" type={LoadingType['PRIMARY']} />
        </div>

        {/* Street View Iframe */}
        {props.isAvailable ? (
          <iframe
            title="streetview-expanded-view"
            className={clsx('size-full border-0', isStreetViewLoading ? 'invisible' : 'visible')}
            style={{ zIndex: 0 }}
            loading="lazy"
            src={props.url || undefined}
            onLoad={() => {
              setTimeout(() => {
                setIsStreetViewLoading(false)
              }, 100)
            }}
          />
        ) : (
          // Not available view
          <div className="size-full d-flex flex-column gap-3 bg-default text-primary input-field justify-content-center align-items-center">
            <CalciteIcon icon="image" style={{ width: 50, height: 50 }} />
            {intl.formatMessage({
              id: 'streetViewUnavailableErrorLabel',
              defaultMessage: defaultMessages.streetViewUnavailableErrorLabel
            })}
          </div>
        )}
      </div>
    </MobilePanel>
  )
}

export default ExpandedStreetView
