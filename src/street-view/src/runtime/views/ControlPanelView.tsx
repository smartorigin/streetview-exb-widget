import { SVG, Switch } from 'jimu-ui'
// Import react for compatibility with older exb versions
import React, { useState } from 'react'
import clsx from '../utils/clsx'

interface ControlPanelViewProps {
  isClickActive: boolean
  isGoogleApiKeyValid: boolean
  setIsWidgetActive: (state: boolean) => void
}

export default function ControlPanelView(props: ControlPanelViewProps) {
  /**
   * True when view is hovered
   */
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <div className="d-flex align-items-end justify-content-end size-fit" style={{ marginBottom: 1, marginRight: 1 }}>
      <div
        role="menu"
        className={clsx(
          'position-relative h-fit bg-default align-items-center d-flex flex-row justify-content-end pe-auto gap-2'
        )}
        style={{
          pointerEvents: 'auto',
          width: isHovered ? 105 : 57,
          padding: 16,
          overflow: 'hidden',
          boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px 0px',
          transition: 'width 150ms',
          transitionTimingFunction: 'ease-in'
        }}
        onMouseEnter={() => {
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
      >
        <div
          className="position-absolute"
          style={{
            marginTop: 2,
            right: 57
          }}
        >
          <Switch
            disabled={!props.isGoogleApiKeyValid}
            checked={props.isClickActive}
            onChange={(e) => {
              props.setIsWidgetActive(e.target.checked)
            }}
          />
        </div>

        <div style={{ minWidth: 25, minHeight: 25 }}>
          <SVG
            src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M18%2011q-2.075%200-3.537-1.463T13%206t1.463-3.537T18%201t3.538%201.463T23%206t-1.463%203.538T18%2011M3.6%2020.4q-.275-.275-.438-.625T3%2019V5q0-.825.588-1.412T5%203h6.7q-.35.675-.525%201.438T11%206q0%201.475.55%202.738t1.5%202.212zm8.4.6v-5.4q0-1.05.638-1.887T14.3%2012.65q.875-.2%201.8-.3t1.9-.1q.8%200%201.538.063T21%2012.5V19q0%20.825-.587%201.413T19%2021z%22%2F%3E%3C%2Fsvg%3E"
            size={25}
            color={props.isClickActive ? 'var(--color-primary)' : '#3a3a3a'}
          />
        </div>
      </div>
    </div>
  )
}
