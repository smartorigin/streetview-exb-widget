export default {
  _widgetLabel: 'Street View',

  /**
   * Section title
   */

  sourceSectionTitle: 'Source',
  generalOptionsSectionTitle: 'General options',
  streetViewApiParamsSectionTitle: 'Street View API',

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
  presetRowTooltipLabel5: 'Open street-view only through "Open In StreetView" popup action.',
  presetRowTooltipLabel6: 'for more details...',
  presetOptionClickToView: 'Click To View',
  presetOptionPopupAction: 'Popup Action',

  // Enable popup action row
  enablePopupActionRowLabel: 'Enable popup action',
  enablePopupActionRowTooltip: 'When enabled a "Open In StreetView" popup action will be available',

  // Enable click row
  enableClickRowLabel: 'Enable map click',
  enableClickRowTooltip: 'When enabled any click on map will open streetview',

  // Enable position icon row
  disablePositionIconRowLabel: 'Enable position icon',
  disablePositionIconRowTooltip: 'Enable the marker icon that indicates the current Street View location on the map.',

  // Enable floating control panel row
  enableControlPanelRowLabel: 'Enable floating control panel',
  enableControlPanelRowTooltip: 'Enable the floating control panel used to toggle the Street View widget on or off.',

  // initial control panel state row
  initialControlPanelStateRowLabel: 'Default control panel state',
  initialControlPanelStateRowTooltip: 'Controls the initial on/off state of the control panel',
  initialControlPanelStateOptionOn: 'on',
  initialControlPanelStateOptionOff: 'off',

  // Default view row
  defaultViewRowLabel: 'Default view',
  defaultViewRowTooltipLabel1: 'Choose the default way street-view is going to be displayed',
  defaultViewRowTooltipLabel2: 'Reduced',
  defaultViewRowTooltipLabel3: 'Open street-view in a floating panel, best for desktop',
  defaultViewRowTooltipLabel4: 'Expanded',
  defaultViewRowTooltipLabel5: 'Open street-view in a sliding mobile panel, best for mobile',
  defaultViewRowPlaceholder: 'Select initial view',
  defaultViewOptionExpanded: 'Expanded',
  defaultViewOptionReduced: 'Reduced',

  /**
   * Street View Api section
   */
  streetViewSectionTooltipLabel: 'Edit parameters of the Google Map Embeded API, see ',
  streetViewSectionTooltipLinkLabel: 'docs',
  streetViewSectionTooltipLink: 'https://developers.google.com/maps/documentation/embed/embedding-map#streetview_mode',

  headingRowLabel: 'Heading',
  headingRowTooltipLabel1:
    "Indicates the compass heading of the camera. Accepted values are from 0 to 360 (both values indicating North, with 90 indicating East, and 180 South). If you don't specify a heading, a value is calculated that directs the camera towards the specified location, from the point at which the closest photograph was taken.",
  headingRowTooltipLabel2: 'Default: 210°',

  pitchRowLabel: 'Pitch',
  pitchRowTooltipLabel1:
    'Specifies the up or down angle of the camera relative to the Street View vehicle. This is often, but not always, flat horizontal. Positive values angle the camera up (with 90 degrees indicating straight up); negative values angle the camera down (with -90 indicating straight down).',
  pitchRowTooltipLabel2: 'Default: 0°',

  radiusRowLabel: 'Radius',
  radiusRowTooltipLabel1:
    'Sets a radius, specified in meters, in which to search for a imagery, centered on the given latitude and longitude. Valid values are non-negative integers.',
  radiusRowTooltipLabel2: 'Default: 50m',

  fovRowLabel: 'Field of view',
  fovRowTooltipLabel1:
    'Determines the horizontal field of view of the image expressed in degrees, with a maximum allowed value of 120. When dealing with a fixed-size viewport, as with a Street View image of a set size, field of view in essence represents zoom, with smaller numbers indicating a higher level of zoom. ',
  fovRowTooltipLabel2: 'Default: 90°',

  sourceRowLabel: 'Source',
  sourceRowTooltipLabel1: 'Limits Street View searches to selected source.',
  sourceRowTooltipLabel2: 'All uses the default sources for Street View; searches are not limited to specific sources.',
  sourceRowTooltipLabel3:
    'Outdoor limits searches to outdoor collections. Indoor collections are not included in search results.',
  sourceRowTooltipLabel4: 'Default: Outdoor',
  sourceRowSelectOptionLabel1: 'Outdoor',
  sourceRowSelectOptionLabel2: 'All'
}
