import { Switch, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { FormattedMessage, type IntlShape } from 'react-intl'
import defaultMessages from '../translations/default'

type IsControlPanelEnabledRowProps = {
  value: boolean
  onChange: (value: boolean) => void
  isClickEnabled: boolean
  intl: IntlShape
}

export default function IsControlPanelEnabledRow(props: IsControlPanelEnabledRowProps) {
  const { intl } = props
  return (
    <SettingRow
      flow="no-wrap"
      label={
        <Tooltip
          placement="top"
          role="tooltip"
          title={intl.formatMessage({
            id: 'enableControlPanelRowTooltip',
            defaultMessage: defaultMessages.enableControlPanelRowTooltip
          })}
        >
          <span>
            <FormattedMessage
              id="enableControlPanelRowLabel"
              defaultMessage={defaultMessages.enableControlPanelRowLabel}
            />
          </span>
        </Tooltip>
      }
    >
      <Switch
        disabled={!props.isClickEnabled}
        checked={props.value}
        onChange={(e) => {
          props.onChange(e.target.checked)
        }}
      />
    </SettingRow>
  )
}
