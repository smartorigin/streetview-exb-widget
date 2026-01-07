System.register([],  (_export) => {
  return {
    execute:  () => {
      _export({
        _widgetLabel: 'Street View',

        /**
         * Section title
         */

        sourceSectionTitle: 'Source',
        generalOptionsSectionTitle: 'Options générales',

        /**
         * Source section
         */

        // Select map row
        selectMapRowLabel: 'Sélectionner une carte',

        // Google API key row
        googleApiKeyRowLabel: 'Clé API Google',
        googleApiKeyRowPlaceholder: 'Entrez votre clé API Google',
        googleApiKeyRowTooltipLinkLabel: 'ici',
        googleApiKeyRowTooltipLinkUrl:
          'https://developers.google.com/maps/documentation/streetview/get-api-key?setupProd=prerequisites',
        googleApiKeyRowTooltipLabel1:
          'Requis pour les intégrations Street View. Voir ',
        googleApiKeyRowTooltipLabel2: ' pour obtenir une clé.',

        /**
         * General options section
         */

        // preset row
        presetRowLabel: 'Préréglage',
        presetRowTooltipLinkLabel: 'Voir la doc',
        presetRowTooltipLabel1: 'Choisir une configuration préréglée',
        presetRowTooltipLabel2: 'Click To View',
        presetRowTooltipLabel3:
          'Ouvrir street-view à chaque clic sur la carte.',
        presetRowTooltipLabel4: 'Action Popup',
        presetRowTooltipLabel5:
          'Ouvrir street-view uniquement via l\'action popup "Ouvrir dans StreetView".',
        presetRowTooltipLabel6: 'pour plus de détails...',
        presetOptionClickToView: 'Click To View',
        presetOptionPopupAction: 'Action Popup',

        // Enable popup action row
        enablePopupActionRowLabel: "Activer l'action popup",
        enablePopupActionRowTooltip:
          'Lorsqu\'activé, une action popup "Ouvrir dans StreetView" sera disponible',

        // Enable click row
        enableClickRowLabel: 'Activer le clic sur la carte',
        enableClickRowTooltip:
          "Lorsqu'activé, tout clic sur la carte ouvrira streetview",

        // Enable position icon row
        disablePositionIconRowLabel: "Activer l'icône de position",
        disablePositionIconRowTooltip:
          "Activer l'icône marqueur indiquant l'emplacement actuel de Street View sur la carte.",

        // Enable floating control panel row
        enableControlPanelRowLabel: 'Activer le panneau de contrôle flottant',
        enableControlPanelRowTooltip:
          'Activer le panneau de contrôle flottant utilisé pour activer ou désactiver le widget Street View.',

        // initial control panel state row
        initialControlPanelStateRowLabel:
          'État par défaut du panneau de contrôle',
        initialControlPanelStateRowTooltip:
          "Contrôle l'état initial activé/désactivé du panneau de contrôle",
        initialControlPanelStateOptionOn: 'activé',
        initialControlPanelStateOptionOff: 'désactivé',

        // Default view row
        defaultViewRowLabel: 'Vue par défaut',
        defaultViewRowTooltipLabel1:
          'Choisir la façon par défaut dont street-view sera affiché',
        defaultViewRowTooltipLabel2: 'Réduit',
        defaultViewRowTooltipLabel3:
          'Ouvrir street-view dans un panneau flottant, idéal pour ordinateur',
        defaultViewRowTooltipLabel4: 'Étendu',
        defaultViewRowTooltipLabel5:
          'Ouvrir street-view dans un panneau coulissant mobile, idéal pour mobile',
        defaultViewRowPlaceholder: 'Sélectionner la vue initiale',
        defaultViewOptionExpanded: 'Étendu',
        defaultViewOptionReduced: 'Réduit',

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
      });
    }
  };
});
