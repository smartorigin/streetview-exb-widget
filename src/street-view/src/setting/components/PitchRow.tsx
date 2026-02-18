import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { Button, NumericInput, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
// biome-ignore lint/style/useImportType: needed for exb11 compat
import React from 'react'
import type { IntlShape } from 'react-intl'
import type { ImmutableObject } from 'seamless-immutable'
import type { StreetViewApiParams } from '../../config'
import defaultMessages from '../translations/default'

type PitchRowProps = {
  streetViewApiParams: StreetViewApiParams
  setStreetViewApiParams: React.Dispatch<
    React.SetStateAction<StreetViewApiParams | ImmutableObject<StreetViewApiParams>>
  >
  intl: IntlShape
}

export default function PitchRow(props: PitchRowProps) {
  const { intl } = props
  return (
    <SettingRow
      flow="wrap"
      className="settingsRowStyle"
      label={
        <div className="d-flex flex-row gap-0.5 align-items-center">
          {intl.formatMessage({
            id: 'headingRowLabel',
            defaultMessage: defaultMessages.headingRowLabel
          })}
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
                  {intl.formatMessage({
                    id: 'headingRowTooltipLabel1',
                    defaultMessage: defaultMessages.headingRowTooltipLabel1
                  })}
                </p>
                <p className="font-semibold mb-0">
                  {intl.formatMessage({
                    id: 'headingRowTooltipLabel2',
                    defaultMessage: defaultMessages.headingRowTooltipLabel2
                  })}
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
            heading: value
          })
        }}
        min={-180}
        max={360}
        formatter={(value) => `${value}°`}
        parser={(value) => parseInt(value, 10)}
        size="sm"
        value={props.streetViewApiParams.heading}
      />
    </SettingRow>
  )
}
