import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { Button, Select, Tooltip } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
import type { IntlShape } from 'react-intl'
import type { ImmutableObject } from 'seamless-immutable'
import type { StreetViewApiParams } from '../../config'
import defaultMessages from '../translations/default'

type StreetViewApiSourceRowProps = {
  streetViewApiParams: StreetViewApiParams
  setStreetViewApiParams: Dispatch<SetStateAction<StreetViewApiParams | ImmutableObject<StreetViewApiParams>>>
  intl: IntlShape
}

export default function StreetViewApiSourceRow(props: StreetViewApiSourceRowProps) {
  const { intl } = props
  return (
    <SettingRow
      flow="wrap"
      label={
        <div className="d-flex flex-row gap-0.5 align-items-center">
          {intl.formatMessage({ id: 'sourceRowLabel', defaultMessage: defaultMessages.sourceRowLabel })}
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
                    id: 'sourceRowTooltipLabel1',
                    defaultMessage: defaultMessages.sourceRowTooltipLabel1
                  })}
                </p>
                <p>
                  {intl.formatMessage({
                    id: 'sourceRowTooltipLabel2',
                    defaultMessage: defaultMessages.sourceRowTooltipLabel2
                  })}
                </p>
                <p>
                  {intl.formatMessage({
                    id: 'sourceRowTooltipLabel3',
                    defaultMessage: defaultMessages.sourceRowTooltipLabel3
                  })}
                </p>
                <p className="font-semibold mb-0">
                  {intl.formatMessage({
                    id: 'sourceRowTooltipLabel4',
                    defaultMessage: defaultMessages.sourceRowTooltipLabel4
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
      <Select
        appendToBody
        defaultValue={props.streetViewApiParams.source}
        value={props.streetViewApiParams.source}
        onChange={(_evt, value: 'default' | 'outdoor') => {
          props.setStreetViewApiParams({
            ...props.streetViewApiParams,
            source: value
          })
        }}
        size="sm"
      >
        <option value="outdoor">
          {intl.formatMessage({
            id: 'sourceRowSelectOptionLabel1',
            defaultMessage: defaultMessages.sourceRowSelectOptionLabel1
          })}
        </option>
        <option value="default">
          {intl.formatMessage({
            id: 'sourceRowSelectOptionLabel2',
            defaultMessage: defaultMessages.sourceRowSelectOptionLabel2
          })}
        </option>
      </Select>
    </SettingRow>
  )
}
