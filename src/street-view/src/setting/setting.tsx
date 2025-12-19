import type { AllWidgetSettingProps } from 'jimu-for-builder';
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info';
import { Button, Select, Switch, TextInput, Tooltip } from 'jimu-ui';
import {
  MapWidgetSelector,
  SettingRow,
  SettingSection
} from 'jimu-ui/advanced/setting-components';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import type {
  InitialViewType,
  WidgetConfig,
  PresetType,
  InitialControlPanelStateType,
  IConfig
} from '../config';
import '../runtime/css/utilities.css';
import './style.css';
import defaultMessages from './translations/default';
// NOTE: Import react for compatibility with older exb versions
import React from 'react';

function Setting(props: AllWidgetSettingProps<WidgetConfig>) {
  const { intl } = props;

  /**
   * Default values of settings
   */
  const defaultSettings: IConfig = {
    preset: 'click-to-view' as PresetType,
    initialViewState: 'reduced' as InitialViewType,
    isPositionIconEnabled: true,
    isClickEnabled: true,
    isPopupActionEnabled: true,
    isControlPanelEnabled: true,
    initialControlPanelState: 'off' as InitialControlPanelStateType,
    googleApiKey: ''
  };

  const [preset, setPreset] = useState<PresetType>(
    props.config.preset || defaultSettings.preset
  );

  const [initialViewState, setInitialViewState] = useState<InitialViewType>(
    props.config.initialViewState || defaultSettings.initialViewState
  );

  const [isPositionIconEnabled, setIsPositionIconEnabled] = useState<boolean>(
    props.config.isPositionIconEnabled || defaultSettings.isPositionIconEnabled
  );

  const [isClickEnabled, setIsClickEnabled] = useState<boolean>(
    props.config.isClickEnabled || defaultSettings.isClickEnabled
  );

  const [isPopupActionEnabled, setIsPopupActionEnabled] = useState<boolean>(
    props.config.isPopupActionEnabled || defaultSettings.isPopupActionEnabled
  );

  const [isControlPanelEnabled, setIsControlPanelEnabled] = useState<boolean>(
    props.config.isControlPanelEnabled || defaultSettings.isControlPanelEnabled
  );

  const [initialControlPanelState, setInitialControlPanelState] = useState(
    props.config.initialControlPanelState ||
      defaultSettings.initialControlPanelState
  );

  const [googleApiKey, setGoogleApiKey] = useState<string>(
    props.config.googleApiKey || defaultSettings.googleApiKey
  );

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
      });
      setPreset(preset);
      setIsClickEnabled(true);
      setIsPositionIconEnabled(true);
      setIsControlPanelEnabled(true);
      setInitialControlPanelState('on');
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
      });
      setPreset(preset);
      setIsPopupActionEnabled(true);
      setIsClickEnabled(false);
      setIsPositionIconEnabled(false);
      setIsControlPanelEnabled(false);
    }
  };

  /**
   * Source settings
   */

  const onMapWidgetChange = (ids: string[]) => {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: ids
    });
  };

  const onGoogleApiKeyChange = (value: string) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('googleApiKey', value)
    });
    setGoogleApiKey(value);
  };

  /**
   * General options settings
   */

  const onIsPositionIconEnabledChange = (checked: boolean) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('isPositionIconEnabled', checked)
    });
    setIsPositionIconEnabled(checked);
  };

  const onIsClickEnabled = (checked: boolean) => {
    props.onSettingChange({
      id: props.id,
      config: props.config
        .set('isClickEnabled', checked)
        .set('isControlPanelEnabled', checked)
    });
    setIsClickEnabled(checked);
    setIsControlPanelEnabled(checked);
  };

  const onIsPopupActionEnabled = (checked: boolean) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('isPopupActionEnabled', checked)
    });
    setIsPopupActionEnabled(checked);
  };

  const onIsControlPanelEnabled = (checked: boolean) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('isControlPanelEnabled', checked)
    });
    setIsControlPanelEnabled(checked);
  };

  const onInitialControlPanelStateChange = (
    value: InitialControlPanelStateType
  ) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('initialControlPanelState', value)
    });
    setInitialControlPanelState(value);
  };

  const onInitialViewStateChange = (value: InitialViewType) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('initialViewState', value)
    });
    setInitialViewState(value);
  };

  React.useEffect(() => {
    // config is empty -> set a new one
    if (Object.keys(props.config).length == 0) {
      props.onSettingChange({
        id: props.id,
        config: defaultSettings
      });
    }
  }, []);

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
          <MapWidgetSelector
            onSelect={onMapWidgetChange}
            useMapWidgetIds={props.useMapWidgetIds}
          />
        </SettingRow>

        {/* API Key */}
        <SettingRow
          flow="wrap"
          className="settingsRowStyle"
          label={
            <div className="d-flex flex-row gap-0.5 align-items-center">
              <FormattedMessage
                id="googleApiKeyRowTooltip"
                defaultMessage={defaultMessages.googleApiKeyRowLabel}
              />
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
                    {intl.formatMessage({
                      id: 'googleApiKeyRowTooltipLabel1',
                      defaultMessage: defaultMessages.googleApiKeyRowTooltipLabel1
                    })}
                    <a href={defaultMessages.googleApiKeyRowTooltipLinkUrl}>
                      {intl.formatMessage({
                        id: 'googleApiKeyRowTooltipLinkLabel',
                        defaultMessage: defaultMessages.googleApiKeyRowTooltipLinkLabel
                      })}
                    </a>
                    {intl.formatMessage({
                      id: 'googleApiKeyRowTooltipLabel2',
                      defaultMessage: defaultMessages.googleApiKeyRowTooltipLabel2
                    })}
                  </div>
                }
              >
                <Button
                  size="sm"
                  icon
                  variant="text"
                  style={{ width: 23, height: 23 }}
                >
                  <InfoOutlined style={{ width: 13, height: 13 }} />
                </Button>
              </Tooltip>
            </div>
          }
        >
          <TextInput
            className="w-100"
            onChange={(e) => {
              onGoogleApiKeyChange(e.target.value);
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
              <FormattedMessage
                id="presetRowLabel"
                defaultMessage={defaultMessages.presetRowLabel}
              />
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
                      {/* TODO: Add link to doc when project is up on github */}
                      <a href="">
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
                <Button
                  size="sm"
                  icon
                  variant="text"
                  style={{ width: 23, height: 23 }}
                >
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
              console.log(value);
              onPresetChange(value);
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
              onIsPopupActionEnabled(e.target.checked);
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
              onIsClickEnabled(e.target.checked);
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
              onIsPositionIconEnabledChange(e.target.checked);
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
              onIsControlPanelEnabled(e.target.checked);
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
                defaultMessage:
                  defaultMessages.initialControlPanelStateRowTooltip
              })}
            >
              <span>
                <FormattedMessage
                  tagName="span"
                  id="initialControlPanelStateRowLabel"
                  defaultMessage={
                    defaultMessages.initialControlPanelStateRowLabel
                  }
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
              onInitialControlPanelStateChange(value);
            }}
            size="sm"
          >
            <option value="on">
              <FormattedMessage
                id="initialControlPanelStateOptionOn"
                defaultMessage={
                  defaultMessages.initialControlPanelStateOptionOn
                }
              />
            </option>
            <option value="off">
              <FormattedMessage
                id="initialControlPanelStateOptionOff"
                defaultMessage={
                  defaultMessages.initialControlPanelStateOptionOff
                }
              />
            </option>
          </Select>
        </SettingRow>

        {/* Default view */}
        <SettingRow
          flow="wrap"
          label={
            <div className="d-flex flex-row gap-0.5 align-items-center">
              <FormattedMessage
                id="defaultViewRowLabel"
                defaultMessage={defaultMessages.defaultViewRowLabel}
              />
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
                <Button
                  size="sm"
                  icon
                  variant="text"
                  style={{ width: 23, height: 23 }}
                >
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
              onInitialViewStateChange(value);
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
    </div>
  );
}

export default Setting;
