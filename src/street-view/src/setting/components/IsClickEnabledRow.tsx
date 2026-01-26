import { Switch, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import React from 'react'
import type { IntlShape } from 'react-intl'
import defaultMessages from '../translations/default'

type IsClickEnabledRowProps = {
  value: boolean
  onChange: (value: boolean) => void
  intl: IntlShape
}

export default function IsClickEnabledRow(props: IsClickEnabledRowProps) {
  const { intl } = props
  return (
    <SettingRow
      flow="no-wrap"
      label={
        <Tooltip
          placement="top"
          role="tooltip"
          title={intl.formatMessage({
            id: 'enableClickRowTooltip',
            defaultMessage: defaultMessages.enableClickRowTooltip
          })}
        >
          <span>
            {intl.formatMessage({ id: 'enableClickRowLabel', defaultMessage: defaultMessages.enableClickRowLabel })}
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
