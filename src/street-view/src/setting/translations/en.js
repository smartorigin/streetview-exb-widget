export default {
  _widgetLabel: 'Street View',

  /**
   * Section title
   */

  sourceSectionTitle: 'Source',
  generalOptionsSectionTitle: 'General options',

  /**
   * Source section
   */

  // Select map row
  selectMapRowLabel: 'Select a map',

  // Google API key row
  googleApiKeyRowLabel: 'Google API key',
  googleApiKeyRowPlaceholder: 'Enter your Google API key',
  googleApiKeyRowTooltipLinkLabel: 'here',
  googleApiKeyRowTooltipLinkUrl:
    'https://developers.google.com/maps/documentation/streetview/get-api-key?setupProd=prerequisites',
  googleApiKeyRowTooltipLabel1: 'Required for Street View embeds. See ',
  googleApiKeyRowTooltipLabel2: ' to get a key.',

  /**
   * General options section
   */

  // preset row
  presetRowLabel: 'Preset',
  presetRowTooltipLinkLabel: 'See doc',
  presetRowTooltipLabel1: 'Choose a preset configuration',
  presetRowTooltipLabel2: 'Click-To-View',
  presetRowTooltipLabel3: 'Open street-view on any click on map.',
  presetRowTooltipLabel4: 'Popup-action',
  presetRowTooltipLabel5:
    'Open street-view only through "Open In StreetView" popup action.',
  presetRowTooltipLabel6: 'for more details...',
  presetOptionClickToView: 'Click To View',
  presetOptionPopupAction: 'Popup Action',

  // Enable popup action row
  enablePopupActionRowLabel: 'Enable popup action',
  enablePopupActionRowTooltip:
    'When enabled a "Open In StreetView" popup action will be available',

  // Enable click row
  enableClickRowLabel: 'Enable map click',
  enableClickRowTooltip: 'When enabled any click on map will open streetview',

  // Enable position icon row
  disablePositionIconRowLabel: 'Enable position icon',
  disablePositionIconRowTooltip:
    'Enable the marker icon that indicates the current Street View location on the map.',

  // Enable floating control panel row
  enableControlPanelRowLabel: 'Enable floating control panel',
  enableControlPanelRowTooltip:
    'Enable the floating control panel used to toggle the Street View widget on or off.',

  // initial control panel state row
  initialControlPanelStateRowLabel: 'Default control panel state',
  initialControlPanelStateRowTooltip:
    'Controls the initial on/off state of the control panel',
  initialControlPanelStateOptionOn: 'on',
  initialControlPanelStateOptionOff: 'off',

  // Default view row
  defaultViewRowLabel: 'Default view',
  defaultViewRowTooltipLabel1:
    'Choose the default way street-view is going to be displayed',
  defaultViewRowTooltipLabel2: 'Reduced',
  defaultViewRowTooltipLabel3:
    'Open street-view in a floating panel, best for desktop',
  defaultViewRowTooltipLabel4: 'Expanded',
  defaultViewRowTooltipLabel5:
    'Open street-view in a sliding mobile panel, best for mobile',
  defaultViewRowPlaceholder: 'Select initial view',
  defaultViewOptionExpanded: 'Expanded',
  defaultViewOptionReduced: 'Reduced'
};
