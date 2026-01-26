import { Switch, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import React from 'react'
import type { IntlShape } from 'react-intl'
import defaultMessages from '../translations/default'

type IsPopupActionEnabledRowProps = {
  value: boolean
  onChange: (value: boolean) => void
  intl: IntlShape
}

export default function IsPopupActionEnabledRow(props: IsPopupActionEnabledRowProps) {
  const { intl } = props
  return (
    <SettingRow
      flow="no-wrap"
      label={
        <Tooltip
          placement="top"
          role="tooltip"
          title={intl.formatMessage({
            id: 'enablePopupActionRowTooltip',
            defaultMessage: defaultMessages.enablePopupActionRowTooltip
          })}
        >
          <span>
            {intl.formatMessage({
              id: 'enablePopupActionRowLabel',
              defaultMessage: defaultMessages.enablePopupActionRowLabel
            })}
          </span>
        </Tooltip>
      }
    >
      <Switch
        checked={props.value}
        onChange={(e) => {
          props.onChange(e.target.checked)
        }}
      />
    </SettingRow>
  )
}
