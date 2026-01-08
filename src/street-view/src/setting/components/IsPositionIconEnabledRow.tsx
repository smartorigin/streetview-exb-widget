import { Switch, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { FormattedMessage, type IntlShape } from 'react-intl'
import defaultMessages from '../translations/default'

type IsPositionIconEnabledRowProps = {
  value: boolean
  onChange: (value: boolean) => void
  isClickEnabled: boolean
  intl: IntlShape
}

export default function IsPositionIconEnabledRow(props: IsPositionIconEnabledRowProps) {
  const { intl } = props
  return (
    <SettingRow
      flow="no-wrap"
      label={
        <Tooltip
          placement="top"
          role="tooltip"
          title={intl.formatMessage({
            id: 'disablePositionIconRowTooltip',
            defaultMessage: defaultMessages.disablePositionIconRowTooltip
          })}
        >
          <span>
            <FormattedMessage
              id="disablePositionIconRowLabel"
              defaultMessage={defaultMessages.disablePositionIconRowLabel}
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
