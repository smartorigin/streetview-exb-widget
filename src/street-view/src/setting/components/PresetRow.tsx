import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { Button, Select, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { FormattedMessage } from 'react-intl'
import type { PresetType } from '../../config'
import defaultMessages from '../translations/default'

type PresetRowProps = {
  value: PresetType
  onChange: (value: string) => void
}

export default function PresetRow(props: PresetRowProps) {
  return (
    <SettingRow
      bottomLine
      flow="wrap"
      label={
        <div className="d-flex flex-row gap-0.5 align-items-center">
          <FormattedMessage id="presetRowLabel" defaultMessage={defaultMessages.presetRowLabel} />
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
              <div className="p-2 h-fit d-flex flex-column">
                <FormattedMessage
                  tagName="p"
                  id="presetRowTooltipLabel1"
                  defaultMessage={defaultMessages.presetRowTooltipLabel1}
                />
                <div className="d-flex flex-column gap-0.5">
                  <p className="font-weight-bold mb-0">
                    <FormattedMessage
                      id="presetRowTooltipLabel2"
                      defaultMessage={defaultMessages.presetRowTooltipLabel2}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      id="presetRowTooltipLabel3"
                      defaultMessage={defaultMessages.presetRowTooltipLabel3}
                    />
                  </p>
                </div>
                <div className="d-flex flex-column gap-0.5">
                  <p className="font-weight-bold mb-0">
                    <FormattedMessage
                      id="presetRowTooltipLabel4"
                      defaultMessage={defaultMessages.presetRowTooltipLabel4}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      id="presetRowTooltipLabel5"
                      defaultMessage={defaultMessages.presetRowTooltipLabel5}
                    />
                  </p>
                </div>
                <p className="mb-0">
                  <a href="https://github.com/smartorigin/streetview-exb-widget">
                    <FormattedMessage
                      id="presetRowTooltipLinkLabel"
                      defaultMessage={defaultMessages.presetRowTooltipLinkLabel}
                    />
                  </a>{' '}
                  <FormattedMessage
                    id="presetRowTooltipLabel6"
                    defaultMessage={defaultMessages.presetRowTooltipLabel6}
                  />
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
      <Select
        appendToBody
        value={props.value}
        defaultValue={props.value}
        onChange={(_evt, value: PresetType) => {
          props.onChange(value)
        }}
        size="sm"
      >
        <option value="click-to-view">
          <FormattedMessage id="presetOptionClickToView" defaultMessage={defaultMessages.presetOptionClickToView} />
        </option>
        <option value="popup-action">
          <FormattedMessage id="presetOptionPopupAction" defaultMessage={defaultMessages.presetOptionPopupAction} />
        </option>
      </Select>
    </SettingRow>
  )
}
