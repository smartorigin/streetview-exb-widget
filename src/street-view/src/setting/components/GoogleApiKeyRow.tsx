import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { Button, TextInput, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { FormattedMessage, type IntlShape } from 'react-intl'
import defaultMessages from '../translations/default'

type GoogleApiKeyRowProps = {
  intl: IntlShape
  value: string
  onChange: (value: string) => void
}

export default function GoogleApiKeyRow(props: GoogleApiKeyRowProps) {
  const { intl } = props
  return (
    <SettingRow
      flow="wrap"
      className="settingsRowStyle"
      label={
        <div className="d-flex flex-row gap-0.5 align-items-center">
          <FormattedMessage id="googleApiKeyRowTooltip" defaultMessage={defaultMessages.googleApiKeyRowLabel} />
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
              <div className="p-2">
                <FormattedMessage
                  id="googleApiKeyRowTooltipLabel1"
                  defaultMessage={defaultMessages.googleApiKeyRowTooltipLabel1}
                />
                <a href={defaultMessages.googleApiKeyRowTooltipLinkUrl}>
                  <FormattedMessage
                    id="googleApiKeyRowTooltipLinkLabel"
                    defaultMessage={defaultMessages.googleApiKeyRowTooltipLinkLabel}
                  />
                </a>
                <FormattedMessage
                  id="googleApiKeyRowTooltipLabel2"
                  defaultMessage={defaultMessages.googleApiKeyRowTooltipLabel2}
                />
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
      <TextInput
        className="w-100"
        onChange={(e) => {
          props.onChange(e.target.value)
        }}
        placeholder={intl.formatMessage({
          id: 'googleApiKeyRowPlaceholder',
          defaultMessage: defaultMessages.googleApiKeyRowPlaceholder
        })}
        size="sm"
        value={props.value}
      />
    </SettingRow>
  )
}
