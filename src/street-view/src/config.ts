import type { ImmutableObject } from 'seamless-immutable';

/**
 * Type of the initial view options, reduced map to "streetview" widget view state but is named "reduced" for clarity
 *
 * @expanded a mobile panel view
 * @reduced a floating panel view
 */
export type InitialViewType = 'expanded' | 'reduced';

/**
 * Type of the initial control panel state (on/off)
 */
export type InitialControlPanelStateType = 'off' | 'on';

/**
 * Type of the widget's general options preset
 *
 * @click_to_view enable opening street view on any map click
 * @popup_action allows opening street view only through popup action
 *
 */
export type PresetType = 'click-to-view' | 'popup-action';

export interface IConfig {
  /**
   * Controls settings preset
   */
  preset: 'click-to-view' | 'popup-action';
  /**
   * Controls wether or not the custom popup actions will be added
   */
  isPopupActionEnabled: boolean;
  /**
   * Controls wether or not click on map function will be enabled
   */
  isClickEnabled: boolean;
  /**
   * Controls initial view type of the streetview
   */
  initialViewState: InitialViewType;
  /**
   * When enabed the streetview position icon doesn't show up
   */
  isPositionIconEnabled: boolean;
  /**
   * Wether or not floating control panel is enabled
   */
  isControlPanelEnabled: boolean;
  /**
   * Controls default state of floating control panel (on/off)
   */
  initialControlPanelState: InitialControlPanelStateType;
  /**
   * Google Maps API key used to access street view
   */
  googleApiKey?: string;
}

export type WidgetConfig = ImmutableObject<IConfig>;