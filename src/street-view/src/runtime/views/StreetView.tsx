import { CalciteIcon } from 'calcite-components'
import { LaunchOutlined } from 'jimu-icons/outlined/editor/launch'
import { Button, Loading, LoadingType } from 'jimu-ui'
// NOTE: Import react for compatibility with older exb versions
import React from 'react'
import type { IntlShape } from 'react-intl'
import defaultMessages from '../translations/default'
import type { WidgetViewType } from '../types/general'
import clsx from '../utils/clsx'

interface StreetViewProps {
  url: string | null
  webUrl: string | null
  isAvailable: boolean
  setView: (view: WidgetViewType) => void
  intl: IntlShape
}

function StreetView(props: StreetViewProps) {
  const { intl } = props

  /**
   * True when the street view iframe is loading
   */
  const [isStreetViewLoading, setIsStreetViewLoading] = React.useState<boolean>(false)

  /**
   * Handle loading state and unavailable state
   */
  React.useEffect(() => {
    if (props.url) {
      setIsStreetViewLoading(true)
    }
  }, [props.url])

  return (
    <div className={clsx('d-flex size-full flex-column mt-auto')}>
      <div className="d-flex mb-3 flex-row gap-3 w-full h-fit">
        {/* Close Street View Button */}
        <Button
          icon
          type="primary"
          aria-label="Close street view"
          style={{ pointerEvents: 'auto' }}
          onClick={() => {
            props.setView('default')
          }}
        >
          <CalciteIcon icon="x" scale="m" />
        </Button>

        {/* Expand View Button */}
        <Button
          icon
          type="primary"
          aria-label="Open street view in fullscreen modal"
          style={{ pointerEvents: 'auto' }}
          aria-haspopup="dialog"
          onClick={() => {
            props.setView('expanded')
          }}
        >
          <CalciteIcon icon="expand" scale="m" />
        </Button>

        {/* Open in new tab Button */}
        <Button
          icon
          type="primary"
          className="ml-auto"
          aria-label="Open google map at this location"
          style={{ pointerEvents: 'auto' }}
          onClick={() => {
            window.open(props.webUrl)
          }}
        >
          <LaunchOutlined scale="m" />
        </Button>
      </div>

      {/* Street View Iframe Container */}
      <div
        className="position-relative flex-grow-1 w-100 bg-default shadow-2xl"
        style={{
          border: '1px solid rgb(189, 189, 189)',
          pointerEvents: 'auto'
        }}
      >
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

        <div className="size-full">
          {props.isAvailable ? (
            <iframe
              title="streetview-default-view"
              className={clsx('size-full border-0', isStreetViewLoading ? 'invisible' : 'visible')}
              style={{ zIndex: 0 }}
              loading="lazy"
              src={props.url || undefined}
              onLoad={() => {
                setIsStreetViewLoading(false)
              }}
            />
          ) : (
            // Not available view
            <div className="size-full d-flex flex-column gap-3 bg-default text-primary text-lg input-field justify-content-center align-items-center">
              <CalciteIcon icon="image" style={{ width: 50, height: 50 }} />
              <p>
                {intl.formatMessage({
                  id: 'streetViewUnavailableErrorLabel',
                  defaultMessage: defaultMessages.streetViewUnavailableErrorLabel
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StreetView
