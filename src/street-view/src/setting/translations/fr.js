System.register([], function (_export) {
  return {
    execute: function () {
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
        defaultViewOptionReduced: 'Réduit'
      });
    }
  };
});
