import type { AllWidgetSettingProps } from 'jimu-for-builder'
import { Button } from 'jimu-ui'
import { SettingSection } from 'jimu-ui/advanced/setting-components'
// Import react for compatibility with older exb versions
import React from 'react'
import type { IConfig, InitialControlPanelStateType, InitialViewType, PresetType, WidgetConfig } from '../config'
import '../runtime/css/utilities.css'
import '../runtime/css/variables.css'
import FovRow from './components/FovRow'
import GoogleApiKeyRow from './components/GoogleApiKeyRow'
import HeadingRow from './components/HeadingRow'
import InitialControlPanelStateRow from './components/InitialControlPanelStateRow'
import InitialViewState from './components/InitialViewRow'
import IsClickEnabledRow from './components/IsClickEnabledRow'
import IsControlPanelEnabledRow from './components/IsControlPanelEnabledRow'
import IsPopupActionEnabledRow from './components/IsPopupActionEnabledRow'
import IsPositionIconEnabledRow from './components/IsPositionIconEnabledRow'
import PitchRow from './components/PitchRow'
import PresetRow from './components/PresetRow'
import RadiusRow from './components/RadiusRow'
import SelectMapRow from './components/SelectMapRow'
import StreetViewApiSourceRow from './components/StreetViewApiSourceRow'
import './style.css'
import defaultMessages from './translations/default'

function Setting(props: AllWidgetSettingProps<WidgetConfig>) {
  const { intl } = props

  /**
   * Default values of settings
   */
  const defaultSettings: IConfig = {
    preset: 'click-to-view',
    initialViewState: 'reduced',
    isPositionIconEnabled: true,
    isClickEnabled: true,
    isPopupActionEnabled: true,
    isControlPanelEnabled: true,
    initialControlPanelState: 'off',
    googleApiKey: '',
    streetViewApiParams: {
      heading: 210,
      pitch: 0,
      fov: 90,
      radius: 50,
      source: 'outdoor'
    }
  }

  const [preset, setPreset] = React.useState<PresetType>(props.config.preset || defaultSettings.preset)

  const [initialViewState, setInitialViewState] = React.useState<InitialViewType>(
    props.config.initialViewState || defaultSettings.initialViewState
  )

  const [isPositionIconEnabled, setIsPositionIconEnabled] = React.useState<boolean>(
    props.config.isPositionIconEnabled || defaultSettings.isPositionIconEnabled
  )

  const [isClickEnabled, setIsClickEnabled] = React.useState<boolean>(
    props.config.isClickEnabled || defaultSettings.isClickEnabled
  )

  const [isPopupActionEnabled, setIsPopupActionEnabled] = React.useState<boolean>(
    props.config.isPopupActionEnabled || defaultSettings.isPopupActionEnabled
  )

  const [isControlPanelEnabled, setIsControlPanelEnabled] = React.useState<boolean>(
    props.config.isControlPanelEnabled || defaultSettings.isControlPanelEnabled
  )

  const [initialControlPanelState, setInitialControlPanelState] = React.useState(
    props.config.initialControlPanelState || defaultSettings.initialControlPanelState
  )

  const [streetViewApiParams, setStreetViewApiParams] = React.useState(
    props.config.streetViewApiParams || defaultSettings.streetViewApiParams
  )

  const [googleApiKey, setGoogleApiKey] = React.useState<string>(
    props.config.googleApiKey || defaultSettings.googleApiKey
  )

  /**
   * Used to reset the streetViewApiParams
   */
  const resetStreetViewApiParams = () => {
    setStreetViewApiParams(defaultSettings.streetViewApiParams)
    return
  }

  /**
   * Handle updating settings preset
   */
  const onPresetChange = (preset: PresetType) => {
    if (preset === 'click-to-view') {
      // Handle click-to-view preset
      props.onSettingChange({
        id: props.id,
        config: props.config
          .set('preset', preset)
          .set('isClickEnabled', true)
          .set('isControlPanelEnabled', true)
          .set('initialControlPanelState', 'on')
          .set('isPositionIconEnabled', true)
      })
      setPreset(preset)
      setIsClickEnabled(true)
      setIsPositionIconEnabled(true)
      setIsControlPanelEnabled(true)
      setInitialControlPanelState('on')
    } else {
      // Handle popup-action preset
      props.onSettingChange({
        id: props.id,
        config: props.config
          .set('preset', preset)
          .set('isPopupActionEnabled', true)
          .set('isClickEnabled', false)
          .set('isControlPanelEnabled', false)
          .set('isPositionIconEnabled', false)
      })
      setPreset(preset)
      setIsPopupActionEnabled(true)
      setIsClickEnabled(false)
      setIsPositionIconEnabled(false)
      setIsControlPanelEnabled(false)
    }
  }

  /**
   * Source settings
   */

  const onMapWidgetChange = (ids: string[]) => {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: ids
    })
  }

  const onGoogleApiKeyChange = (value: string) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('googleApiKey', value)
    })
    setGoogleApiKey(value)
  }

  /**
   * General options settings
   */

  const onIsPositionIconEnabledChange = (checked: boolean) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('isPositionIconEnabled', checked)
    })
    setIsPositionIconEnabled(checked)
  }

  const onIsClickEnabled = (checked: boolean) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('isClickEnabled', checked).set('isControlPanelEnabled', checked)
    })
    setIsClickEnabled(checked)
    setIsControlPanelEnabled(checked)
  }

  const onIsPopupActionEnabled = (checked: boolean) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('isPopupActionEnabled', checked)
    })
    setIsPopupActionEnabled(checked)
  }

  const onIsControlPanelEnabled = (checked: boolean) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('isControlPanelEnabled', checked)
    })
    setIsControlPanelEnabled(checked)
  }

  const onInitialControlPanelStateChange = (value: InitialControlPanelStateType) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('initialControlPanelState', value)
    })
    setInitialControlPanelState(value)
  }

  const onInitialViewStateChange = (value: InitialViewType) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('initialViewState', value)
    })
    setInitialViewState(value)
  }

  /**
   * Handle updating Street View API settings
   */
  React.useEffect(() => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('streetViewApiParams', streetViewApiParams)
    })
  }, [streetViewApiParams])

  /**
   * Initialize config if empty
   */
  React.useEffect(() => {
    // config is empty -> set a new one
    if (Object.keys(props.config).length === 0) {
      props.onSettingChange({
        id: props.id,
        config: defaultSettings
      })
    }
  }, [])

  return (
    <div className="w-100">
      {/* Source Section */}
      <SettingSection
        aria-label={intl.formatMessage({
          id: 'sourceSectionTitle',
          defaultMessage: defaultMessages.sourceSectionTitle
        })}
        role="group"
        title={intl.formatMessage({
          id: 'sourceSectionTitle',
          defaultMessage: defaultMessages.sourceSectionTitle
        })}
      >
        <SelectMapRow onChange={onMapWidgetChange} useMapWidgetIds={props.useMapWidgetIds} intl={intl} />

        <GoogleApiKeyRow onChange={onGoogleApiKeyChange} value={googleApiKey} intl={intl} />
      </SettingSection>

      {/* General Options Section */}
      <SettingSection
        aria-label={intl.formatMessage({
          id: 'generalOptionsSectionTitle',
          defaultMessage: defaultMessages.generalOptionsSectionTitle
        })}
        role="group"
        title={intl.formatMessage({
          id: 'generalOptionsSectionTitle',
          defaultMessage: defaultMessages.generalOptionsSectionTitle
        })}
      >
        <PresetRow onChange={onPresetChange} value={preset} intl={intl} />
        <IsPopupActionEnabledRow onChange={onIsPopupActionEnabled} value={isPopupActionEnabled} intl={intl} />
        <IsClickEnabledRow onChange={onIsClickEnabled} value={isClickEnabled} intl={intl} />
        <IsPositionIconEnabledRow
          onChange={onIsPositionIconEnabledChange}
          value={isPositionIconEnabled}
          isClickEnabled={isClickEnabled}
          intl={intl}
        />
        <IsControlPanelEnabledRow
          onChange={onIsControlPanelEnabled}
          value={isControlPanelEnabled}
          isClickEnabled={isClickEnabled}
          intl={intl}
        />
        <InitialControlPanelStateRow
          onChange={onInitialControlPanelStateChange}
          value={initialControlPanelState}
          isClickEnabled={isClickEnabled}
          intl={intl}
        />
        <InitialViewState onChange={onInitialViewStateChange} value={initialViewState} intl={intl} />
      </SettingSection>

      {/* Street View Api Section */}
      <SettingSection
        aria-label={intl.formatMessage({
          id: 'streetViewApiParamsSectionTitle',
          defaultMessage: defaultMessages.streetViewApiParamsSectionTitle
        })}
        role="group"
        title={
          <div className="d-flex flex-row justify-content-between align-items-start">
            {intl.formatMessage({
              id: 'streetViewApiParamsSectionTitle',
              defaultMessage: defaultMessages.streetViewApiParamsSectionTitle
            })}
            {/* Reset Button */}
            <Button
              className="size-fit"
              size="sm"
              variant="text"
              aria-label="Reset the settings of the Street View API section"
              onClick={() => resetStreetViewApiParams()}
            >
              Reset
              {/* <ResetOutlined className="mr-0" size={13} /> */}
            </Button>
          </div>
        }
      >
        <HeadingRow
          streetViewApiParams={streetViewApiParams}
          setStreetViewApiParams={setStreetViewApiParams}
          intl={intl}
        />
        <PitchRow
          streetViewApiParams={streetViewApiParams}
          setStreetViewApiParams={setStreetViewApiParams}
          intl={intl}
        />
        <FovRow streetViewApiParams={streetViewApiParams} setStreetViewApiParams={setStreetViewApiParams} intl={intl} />
        <RadiusRow
          streetViewApiParams={streetViewApiParams}
          setStreetViewApiParams={setStreetViewApiParams}
          intl={intl}
        />
        <StreetViewApiSourceRow
          streetViewApiParams={streetViewApiParams}
          setStreetViewApiParams={setStreetViewApiParams}
          intl={intl}
        />
      </SettingSection>

      <SettingSection>
        <p className="d-flex flex-column align-items-center mb-0">
          <div>
            {intl.formatMessage({
              id: 'creditLabel1',
              defaultMessage: defaultMessages.creditLabel1
            })}
            <a href="https://smart/origin.com">
              {intl.formatMessage({
                id: 'creditLinkLabel1',
                defaultMessage: defaultMessages.creditLinkLabel1
              })}
            </a>
          </div>
          <span style={{ marginTop: 3 }}>•</span>
          <div>
            {intl.formatMessage({
              id: 'creditLabel2',
              defaultMessage: defaultMessages.creditLabel2
            })}
            <a href="https://github.com/smartorigin/streetview-exb-widget">
              {intl.formatMessage({
                id: 'creditLinkLabel2',
                defaultMessage: defaultMessages.creditLinkLabel2
              })}
            </a>
          </div>
        </p>
      </SettingSection>
    </div>
  )
}

export default Setting
