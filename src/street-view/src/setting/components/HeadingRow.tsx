import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { Button, NumericInput, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import type { Dispatch, SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'
import type { ImmutableObject } from 'seamless-immutable'
import type { StreetViewApiParams } from '../../config'
import defaultMessages from '../translations/default'

type HeadingRowProps = {
  streetViewApiParams: StreetViewApiParams
  setStreetViewApiParams: Dispatch<SetStateAction<StreetViewApiParams | ImmutableObject<StreetViewApiParams>>>
}

export default function HeadingRow(props: HeadingRowProps) {
  return (
    <SettingRow
      flow="wrap"
      className="settingsRowStyle"
      label={
        <div className="d-flex flex-row gap-0.5 align-items-center">
          <FormattedMessage id="pitchRowLabel" defaultMessage={defaultMessages.pitchRowLabel} />
          <Tooltip
            enterDelay={100}
            enterNextDelay={0}
            enterTouchDelay={700}
            interactive
            leaveDelay={250}
            leaveTouchDelay={1500}
            offsetOptions={4}
            placement="top"
            role="tooltip"
            title={
              <div className="p-2 d-flex flex-column" style={{ maxWidth: '300px' }}>
                <p className="text-pretty">
                  <FormattedMessage id="pitchRowTooltipLabel1" defaultMessage={defaultMessages.pitchRowTooltipLabel1} />
                </p>
                <p className="font-semibold mb-0">
                  <FormattedMessage id="pitchRowTooltipLabel2" defaultMessage={defaultMessages.pitchRowTooltipLabel2} />
                </p>
              </div>
            }
          >
            <Button size="sm" icon variant="text" style={{ width: 23, height: 23 }}>
              <InfoOutlined style={{ width: 13, height: 13 }} />
            </Button>
          </Tooltip>
        </div>
      }
    >
      <NumericInput
        className="w-100"
        onChange={(value) => {
          props.setStreetViewApiParams({
            ...props.streetViewApiParams,
            pitch: value
          })
        }}
        formatter={(value) => `${value}°`}
        parser={(value) => parseInt(value, 10)}
        min={-90}
        max={90}
        size="sm"
        value={props.streetViewApiParams.pitch}
      />
    </SettingRow>
  )
}
