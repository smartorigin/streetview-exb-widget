import { MapWidgetSelector, SettingRow } from 'jimu-ui/advanced/setting-components'
import React from 'react'
import type { IntlShape } from 'react-intl'
import type { ImmutableArray } from 'seamless-immutable'
import defaultMessages from '../translations/default'

type SelectMapRowProps = {
  useMapWidgetIds: ImmutableArray<string>
  onChange: (ids: string[]) => void
  intl: IntlShape
}

export default function SelectMapRow(props: SelectMapRowProps) {
  const { intl } = props
  return (
    <SettingRow
      flow="wrap"
      label={intl.formatMessage({ id: 'selectMapRowLabel', defaultMessage: defaultMessages.selectMapRowLabel })}
    >
      <MapWidgetSelector onSelect={props.onChange} useMapWidgetIds={props.useMapWidgetIds} />
    </SettingRow>
  )
}
