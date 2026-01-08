import { MapWidgetSelector, SettingRow } from 'jimu-ui/advanced/setting-components'
import { FormattedMessage } from 'react-intl'
import type { ImmutableArray } from 'seamless-immutable'
import defaultMessages from '../translations/default'

type SelectMapRowProps = {
  useMapWidgetIds: ImmutableArray<string>
  onChange: (ids: string[]) => void
}

export default function SelectMapRow(props: SelectMapRowProps) {
  return (
    <SettingRow
      flow="wrap"
      label={<FormattedMessage id="selectMapRowLabel" defaultMessage={defaultMessages.selectMapRowLabel} />}
    >
      <MapWidgetSelector onSelect={props.onChange} useMapWidgetIds={props.useMapWidgetIds} />
    </SettingRow>
  )
}
