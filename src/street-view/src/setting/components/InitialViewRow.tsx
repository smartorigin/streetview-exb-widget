import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { Button, Select, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import React from 'react'
import type { IntlShape } from 'react-intl'
import type { InitialViewType } from '../../config'
import defaultMessages from '../translations/default'

type InitialViewStateProps = {
  value: InitialViewType
  onChange: (value: string) => void
  intl: IntlShape
}

export default function InitialViewState(props: InitialViewStateProps) {
  const { intl } = props
  return (
    <SettingRow
      flow="wrap"
      label={
        <div className="d-flex flex-row gap-0.5 align-items-center">
          {intl.formatMessage({ id: 'defaultViewRowLabel', defaultMessage: defaultMessages.defaultViewRowLabel })}
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
                {intl.formatMessage({
                  id: 'defaultViewRowTooltipLabel1',
                  defaultMessage: defaultMessages.defaultViewRowTooltipLabel1
                })}
                <div className="d-flex flex-column gap-0.5">
                  <p className="font-weight-bold mb-0">
                    {intl.formatMessage({
                      id: 'defaultViewRowTooltipLabel2',
                      defaultMessage: defaultMessages.defaultViewRowTooltipLabel2
                    })}
                  </p>
                  <p>
                    {intl.formatMessage({
                      id: 'defaultViewRowTooltipLabel3',
                      defaultMessage: defaultMessages.defaultViewRowTooltipLabel3
                    })}
                  </p>
                </div>
                <div className="d-flex flex-column gap-0.5">
                  <p className="font-weight-bold mb-0">
                    {intl.formatMessage({
                      id: 'defaultViewRowTooltipLabel4',
                      defaultMessage: defaultMessages.defaultViewRowTooltipLabel4
                    })}
                  </p>
                  <p className="mb-0">
                    {intl.formatMessage({
                      id: 'defaultViewRowTooltipLabel5',
                      defaultMessage: defaultMessages.defaultViewRowTooltipLabel5
                    })}
                  </p>
                </div>
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
        defaultValue={props.value || 'reduced'}
        value={props.value || 'reduced'}
        onChange={(evt, value: 'expanded' | 'reduced') => {
          const nextValue =
            ((value as any)?.props?.value ??
              (typeof value === 'string' ? value : (value as any)?.value) ??
              evt?.target?.value ??
              evt?.currentTarget?.value ??
              evt?.value) as InitialViewType
          if (!nextValue) return
          props.onChange(nextValue)
        }}
        placeholder={intl.formatMessage({
          id: 'defaultViewRowPlaceholder',
          defaultMessage: defaultMessages.defaultViewRowPlaceholder
        })}
        size="sm"
      >
        <option value="expanded">
          {intl.formatMessage({
            id: 'defaultViewOptionExpanded',
            defaultMessage: defaultMessages.defaultViewOptionExpanded
          })}
        </option>
        <option value="reduced">
          {intl.formatMessage({
            id: 'defaultViewOptionReduced',
            defaultMessage: defaultMessages.defaultViewOptionReduced
          })}
        </option>
      </Select>
    </SettingRow>
  )
}
