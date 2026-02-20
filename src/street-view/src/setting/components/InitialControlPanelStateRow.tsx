import { Select, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import React from 'react'
import type { IntlShape } from 'react-intl'
import type { InitialControlPanelStateType } from '../../config'
import defaultMessages from '../translations/default'

type InitialControlPanelStateRowProps = {
  value: InitialControlPanelStateType
  onChange: (value: string) => void
  isClickEnabled: boolean
  intl: IntlShape
}

export default function InitialControlPanelStateRow(props: InitialControlPanelStateRowProps) {
  const { intl } = props
  return (
    <SettingRow
      bottomLine
      flow="wrap"
      label={
        <Tooltip
          placement="top"
          role="tooltip"
          title={intl.formatMessage({
            id: 'initialControlPanelStateRowTooltip',
            defaultMessage: defaultMessages.initialControlPanelStateRowTooltip
          })}
        >
          <span>
            {intl.formatMessage({
              id: 'span',
              defaultMessage: defaultMessages.initialControlPanelStateRowLabel
            })}
          </span>
        </Tooltip>
      }
    >
      <Select
        appendToBody
        disabled={!props.isClickEnabled}
        value={props.value || 'off'}
        defaultValue={props.value || 'off'}
        onChange={(evt, value: InitialControlPanelStateType) => {
          const nextValue =
            ((value as any)?.props?.value ??
              (typeof value === 'string' ? value : (value as any)?.value) ??
              evt?.target?.value ??
              evt?.currentTarget?.value ??
              evt?.value) as InitialControlPanelStateType
          if (!nextValue) return
          props.onChange(nextValue)
        }}
        size="sm"
      >
        <option value="on">
          {intl.formatMessage({
            id: 'initialControlPanelStateOptionOn',
            defaultMessage: defaultMessages.initialControlPanelStateOptionOn
          })}
        </option>
        <option value="off">
          {intl.formatMessage({
            id: 'initialControlPanelStateOptionOff',
            defaultMessage: defaultMessages.initialControlPanelStateOptionOff
          })}
        </option>
      </Select>
    </SettingRow>
  )
}
