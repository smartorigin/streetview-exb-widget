import type { AllWidgetSettingProps } from 'jimu-for-builder'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { Button, NumericInput, Select, Switch, TextInput, Tooltip } from 'jimu-ui'
import { MapWidgetSelector, SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import type { IConfig, InitialControlPanelStateType, InitialViewType, PresetType, WidgetConfig } from '../config'
import '../runtime/css/utilities.css'
import '../runtime/css/variables.css'
import './style.css'
// NOTE: Import react for compatibility with older exb versions
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

  const [preset, setPreset] = useState<PresetType>(props.config.preset || defaultSettings.preset)

  const [initialViewState, setInitialViewState] = useState<InitialViewType>(
    props.config.initialViewState || defaultSettings.initialViewState
  )

  const [isPositionIconEnabled, setIsPositionIconEnabled] = useState<boolean>(
    props.config.isPositionIconEnabled || defaultSettings.isPositionIconEnabled
  )

  const [isClickEnabled, setIsClickEnabled] = useState<boolean>(
    props.config.isClickEnabled || defaultSettings.isClickEnabled
  )

  const [isPopupActionEnabled, setIsPopupActionEnabled] = useState<boolean>(
    props.config.isPopupActionEnabled || defaultSettings.isPopupActionEnabled
  )

  const [isControlPanelEnabled, setIsControlPanelEnabled] = useState<boolean>(
    props.config.isControlPanelEnabled || defaultSettings.isControlPanelEnabled
  )

  const [initialControlPanelState, setInitialControlPanelState] = useState(
    props.config.initialControlPanelState || defaultSettings.initialControlPanelState
  )

  const [streetViewApiParams, setStreetViewApiParams] = useState(
    props.config.streetViewApiParams || defaultSettings.streetViewApiParams
  )

  const [googleApiKey, setGoogleApiKey] = useState<string>(props.config.googleApiKey || defaultSettings.googleApiKey)

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
  useEffect(() => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('streetViewApiParams', streetViewApiParams)
    })
  }, [streetViewApiParams])

  /**
   * Initialize config if empty
   */
  useEffect(() => {
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
        {/* Map selector */}
        <SettingRow
          flow="wrap"
          label={intl.formatMessage({
            id: 'selectMapRowLabel',
            defaultMessage: defaultMessages.selectMapRowLabel
          })}
        >
          <MapWidgetSelector onSelect={onMapWidgetChange} useMapWidgetIds={props.useMapWidgetIds} />
        </SettingRow>

        {/* API Key */}
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
              onGoogleApiKeyChange(e.target.value)
            }}
            placeholder={intl.formatMessage({
              id: 'googleApiKeyRowPlaceholder',
              defaultMessage: defaultMessages.googleApiKeyRowPlaceholder
            })}
            size="sm"
            value={googleApiKey}
          />
        </SettingRow>
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
        {/* Preset */}
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
            defaultValue={preset}
            onChange={(_evt, value: PresetType) => {
              console.log(value)
              onPresetChange(value)
            }}
            size="sm"
          >
            <option value="click-to-view">
              {intl.formatMessage({
                id: 'presetOptionClickToView',
                defaultMessage: defaultMessages.presetOptionClickToView
              })}
            </option>
            <option value="popup-action">
              {intl.formatMessage({
                id: 'presetOptionPopupAction',
                defaultMessage: defaultMessages.presetOptionPopupAction
              })}
            </option>
          </Select>
        </SettingRow>

        {/* Enable popup action */}
        <SettingRow
          flow="no-wrap"
          label={
            <Tooltip
              placement="top"
              role="tooltip"
              title={intl.formatMessage({
                id: 'enablePopupActionRowTooltip',
                defaultMessage: defaultMessages.enablePopupActionRowTooltip
              })}
            >
              <span>
                {intl.formatMessage({
                  id: 'enablePopupActionRowLabel',
                  defaultMessage: defaultMessages.enablePopupActionRowLabel
                })}
              </span>
            </Tooltip>
          }
        >
          <Switch
            checked={isPopupActionEnabled}
            onChange={(e) => {
              onIsPopupActionEnabled(e.target.checked)
            }}
          />
        </SettingRow>

        {/* Enable map click */}
        <SettingRow
          flow="no-wrap"
          label={
            <Tooltip
              placement="top"
              role="tooltip"
              title={intl.formatMessage({
                id: 'enableClickRowTooltip',
                defaultMessage: defaultMessages.enableClickRowTooltip
              })}
            >
              <span>
                {intl.formatMessage({
                  id: 'enableClickRowLabel',
                  defaultMessage: defaultMessages.enableClickRowLabel
                })}
              </span>
            </Tooltip>
          }
        >
          <Switch
            checked={isClickEnabled}
            onChange={(e) => {
              onIsClickEnabled(e.target.checked)
            }}
          />
        </SettingRow>

        {/* Disable position icon */}
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
                {intl.formatMessage({
                  id: 'disablePositionIconRowLabel',
                  defaultMessage: defaultMessages.disablePositionIconRowLabel
                })}
              </span>
            </Tooltip>
          }
        >
          <Switch
            disabled={!isClickEnabled}
            checked={isPositionIconEnabled}
            onChange={(e) => {
              onIsPositionIconEnabledChange(e.target.checked)
            }}
          />
        </SettingRow>

        {/* Enable control panel */}
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
                {intl.formatMessage({
                  id: 'enableControlPanelRowLabel',
                  defaultMessage: defaultMessages.enableControlPanelRowLabel
                })}
              </span>
            </Tooltip>
          }
        >
          <Switch
            disabled={!isClickEnabled}
            checked={isControlPanelEnabled}
            onChange={(e) => {
              onIsControlPanelEnabled(e.target.checked)
            }}
          />
        </SettingRow>

        {/* Initial control panel state */}
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
            disabled={!isClickEnabled}
            defaultValue={initialControlPanelState}
            onChange={(_evt, value: InitialControlPanelStateType) => {
              onInitialControlPanelStateChange(value)
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

        {/* Default view */}
        <SettingRow
          flow="wrap"
          label={
            <div className="d-flex flex-row gap-0.5 align-items-center">
              <FormattedMessage id="defaultViewRowLabel" defaultMessage={defaultMessages.defaultViewRowLabel} />
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
                      id="defaultViewRowTooltipLabel1"
                      defaultMessage={defaultMessages.defaultViewRowTooltipLabel1}
                    />
                    <div className="d-flex flex-column gap-0.5">
                      <p className="font-weight-bold mb-0">
                        <FormattedMessage
                          id="defaultViewRowTooltipLabel2"
                          defaultMessage={defaultMessages.defaultViewRowTooltipLabel2}
                        />
                      </p>
                      <p>
                        <FormattedMessage
                          id="defaultViewRowTooltipLabel3"
                          defaultMessage={defaultMessages.defaultViewRowTooltipLabel3}
                        />
                      </p>
                    </div>
                    <div className="d-flex flex-column gap-0.5">
                      <p className="font-weight-bold mb-0">
                        <FormattedMessage
                          id="defaultViewRowTooltipLabel4"
                          defaultMessage={defaultMessages.defaultViewRowTooltipLabel4}
                        />
                      </p>
                      <p className="mb-0">
                        <FormattedMessage
                          id="defaultViewRowTooltipLabel5"
                          defaultMessage={defaultMessages.defaultViewRowTooltipLabel5}
                        />
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
            defaultValue={initialViewState}
            onChange={(_evt, value: 'expanded' | 'reduced') => {
              onInitialViewStateChange(value)
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
      </SettingSection>

      {/* Street View Api Section */}
      <SettingSection
        aria-label={intl.formatMessage({
          id: 'streetViewApiParamsSectionTitle',
          defaultMessage: defaultMessages.streetViewApiParamsSectionTitle
        })}
        role="group"
        title={
          <FormattedMessage
            id="streetViewApiParamsSectionTitle"
            defaultMessage={defaultMessages.streetViewApiParamsSectionTitle}
          />
        }
      >
        {/* Heading */}
        <SettingRow
          flow="wrap"
          className="settingsRowStyle"
          label={
            <div className="d-flex flex-row gap-0.5 align-items-center">
              <FormattedMessage id="headingRowLabel" defaultMessage={defaultMessages.headingRowLabel} />
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
                      <FormattedMessage
                        id="headingRowTooltipLabel1"
                        defaultMessage={defaultMessages.headingRowTooltipLabel1}
                      />
                    </p>
                    <p className="font-semibold mb-0">
                      <FormattedMessage
                        id="headingRowTooltipLabel2"
                        defaultMessage={defaultMessages.headingRowTooltipLabel2}
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
          <NumericInput
            className="w-100"
            onChange={(value) => {
              setStreetViewApiParams({
                ...streetViewApiParams,
                heading: value
              })
            }}
            min={-180}
            max={360}
            formatter={(value) => `${value}°`}
            parser={(value) => parseInt(value, 10)}
            size="sm"
            value={streetViewApiParams.heading}
          />
        </SettingRow>

        {/* Pitch */}
        <SettingRow
          flow="wrap"
          className="settingsRowStyle"
          label={
            <div className="d-flex flex-row gap-0.5 align-items-center">
              <FormattedMessage id="pitchRowLabel" defaultMessage={defaultMessages.pitchRowLabel} />
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
                      <FormattedMessage
                        id="pitchRowTooltipLabel1"
                        defaultMessage={defaultMessages.pitchRowTooltipLabel1}
                      />
                    </p>
                    <p className="font-semibold mb-0">
                      <FormattedMessage
                        id="pitchRowTooltipLabel2"
                        defaultMessage={defaultMessages.pitchRowTooltipLabel2}
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
          <NumericInput
            className="w-100"
            onChange={(value) => {
              setStreetViewApiParams({
                ...streetViewApiParams,
                pitch: value
              })
            }}
            formatter={(value) => `${value}°`}
            parser={(value) => parseInt(value, 10)}
            min={-90}
            max={90}
            size="sm"
            value={streetViewApiParams.pitch}
          />
        </SettingRow>

        {/* Fov */}
        <SettingRow
          flow="wrap"
          className="settingsRowStyle"
          label={
            <div className="d-flex flex-row gap-0.5 align-items-center">
              <FormattedMessage id="fovRowLabel" defaultMessage={defaultMessages.fovRowLabel} />
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
                      <FormattedMessage id="fovRowTooltipLabel1" defaultMessage={defaultMessages.fovRowTooltipLabel1} />
                    </p>
                    <p className="font-semibold mb-0">
                      <FormattedMessage id="fovRowTooltipLabel2" defaultMessage={defaultMessages.fovRowTooltipLabel2} />
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
          <NumericInput
            className="w-100"
            onChange={(value) => {
              setStreetViewApiParams({
                ...streetViewApiParams,
                fov: value
              })
            }}
            formatter={(value) => `${value}°`}
            parser={(value) => parseInt(value, 10)}
            min={10}
            max={100}
            size="sm"
            value={streetViewApiParams.fov}
          />
        </SettingRow>

        {/* Radius */}
        <SettingRow
          flow="wrap"
          className="settingsRowStyle"
          label={
            <div className="d-flex flex-row gap-0.5 align-items-center">
              <FormattedMessage id="radiusRowLabel" defaultMessage={defaultMessages.radiusRowLabel} />
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
                      <FormattedMessage
                        id="radiusRowTooltipLabel1"
                        defaultMessage={defaultMessages.radiusRowTooltipLabel1}
                      />
                    </p>
                    <p className="font-semibold mb-0">
                      <FormattedMessage
                        id="radiusRowTooltipLabel2"
                        defaultMessage={defaultMessages.radiusRowTooltipLabel2}
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
          <NumericInput
            className="w-100"
            onChange={(value) => {
              setStreetViewApiParams({
                ...streetViewApiParams,
                radius: value
              })
            }}
            formatter={(value) => `${value}m`}
            parser={(value) => parseInt(value, 10)}
            min={0}
            size="sm"
            value={streetViewApiParams.radius}
          />
        </SettingRow>

        {/* Source */}
        <SettingRow
          flow="wrap"
          label={
            <div className="d-flex flex-row gap-0.5 align-items-center">
              <FormattedMessage id="sourceRowLabel" defaultMessage={defaultMessages.sourceRowLabel} />
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
                      <FormattedMessage
                        id="sourceRowTooltipLabel1"
                        defaultMessage={defaultMessages.sourceRowTooltipLabel1}
                      />
                    </p>
                    <p>
                      <FormattedMessage
                        id="sourceRowTooltipLabel2"
                        defaultMessage={defaultMessages.sourceRowTooltipLabel2}
                      />
                    </p>
                    <p>
                      <FormattedMessage
                        id="sourceRowTooltipLabel3"
                        defaultMessage={defaultMessages.sourceRowTooltipLabel3}
                      />
                    </p>
                    <p className="font-semibold mb-0">
                      <FormattedMessage
                        id="sourceRowTooltipLabel4"
                        defaultMessage={defaultMessages.sourceRowTooltipLabel4}
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
            defaultValue={defaultSettings.streetViewApiParams.source}
            onChange={(_evt, value: 'default' | 'outdoor') => {
              setStreetViewApiParams({
                ...streetViewApiParams,
                source: value
              })
            }}
            size="sm"
          >
            <option value="outdoor">
              <FormattedMessage
                id="sourceRowSelectOptionLabel1"
                defaultMessage={defaultMessages.sourceRowSelectOptionLabel1}
              />
            </option>
            <option value="default">
              <FormattedMessage
                id="sourceRowSelectOptionLabel2"
                defaultMessage={defaultMessages.sourceRowSelectOptionLabel2}
              />
            </option>
          </Select>
        </SettingRow>
      </SettingSection>
    </div>
  )
}

export default Setting
