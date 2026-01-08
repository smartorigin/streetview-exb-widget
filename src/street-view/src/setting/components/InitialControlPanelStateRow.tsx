import { Select, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { FormattedMessage, type IntlShape } from 'react-intl'
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
            <FormattedMessage
              tagName="span"
              id="initialControlPanelStateRowLabel"
              defaultMessage={defaultMessages.initialControlPanelStateRowLabel}
            />
          </span>
        </Tooltip>
      }
    >
      <Select
        appendToBody
        disabled={!props.isClickEnabled}
        value={props.value}
        defaultValue={props.value}
        onChange={(_evt, value: InitialControlPanelStateType) => {
          props.onChange(value)
        }}
        size="sm"
      >
        <option value="on">
          <FormattedMessage
            id="initialControlPanelStateOptionOn"
            defaultMessage={defaultMessages.initialControlPanelStateOptionOn}
          />
        </option>
        <option value="off">
          <FormattedMessage
            id="initialControlPanelStateOptionOff"
            defaultMessage={defaultMessages.initialControlPanelStateOptionOff}
          />
        </option>
      </Select>
    </SettingRow>
  )
}
