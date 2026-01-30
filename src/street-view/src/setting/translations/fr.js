System.register([], (_export) => {
  return {
    execute: () => {
      _export({
        _widgetLabel: 'Street View',

        /**
         * Section title
         */

        sourceSectionTitle: 'Source',
        generalOptionsSectionTitle: 'Options générales',
        streetViewApiParamsSectionTitle: 'API Street View',

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
        googleApiKeyRowTooltipLabel1: 'Requis pour les intégrations Street View. Voir ',
        googleApiKeyRowTooltipLabel2: ' pour obtenir une clé.',

        /**
         * General options section
         */

        // preset row
        presetRowLabel: 'Préréglage',
        presetRowTooltipLinkLabel: 'Voir la doc',
        presetRowTooltipLabel1: 'Choisir une configuration préréglée',
        presetRowTooltipLabel2: 'Click-To-View',
        presetRowTooltipLabel3: 'Ouvrir street-view à chaque clic sur la carte.',
        presetRowTooltipLabel4: 'Popup-action',
        presetRowTooltipLabel5: 'Ouvrir street-view uniquement via l\'action popup "Ouvrir dans StreetView".',
        presetRowTooltipLabel6: 'pour plus de détails...',
        presetOptionClickToView: 'Click To View',
        presetOptionPopupAction: 'Action Popup',

        // Enable popup action row
        enablePopupActionRowLabel: "Activer l'action popup",
        enablePopupActionRowTooltip: 'Lorsqu\'activé, une action popup "Ouvrir dans StreetView" sera disponible',

        // Enable click row
        enableClickRowLabel: 'Activer le clic sur la carte',
        enableClickRowTooltip: "Lorsqu'activé, tout clic sur la carte ouvrira streetview",

        // Enable position icon row
        disablePositionIconRowLabel: "Activer l'icône de position",
        disablePositionIconRowTooltip:
          "Activer l'icône marqueur indiquant l'emplacement actuel de Street View sur la carte.",

        // Enable floating control panel row
        enableControlPanelRowLabel: 'Activer le panneau de contrôle flottant',
        enableControlPanelRowTooltip:
          'Activer le panneau de contrôle flottant utilisé pour activer ou désactiver le widget Street View.',

        // initial control panel state row
        initialControlPanelStateRowLabel: 'État par défaut du panneau de contrôle',
        initialControlPanelStateRowTooltip: "Contrôle l'état initial activé/désactivé du panneau de contrôle",
        initialControlPanelStateOptionOn: 'activé',
        initialControlPanelStateOptionOff: 'désactivé',

        // Default view row
        defaultViewRowLabel: 'Vue par défaut',
        defaultViewRowTooltipLabel1: 'Choisir la façon par défaut dont street-view sera affiché',
        defaultViewRowTooltipLabel2: 'Réduit',
        defaultViewRowTooltipLabel3: 'Ouvrir street-view dans un panneau flottant, idéal pour ordinateur',
        defaultViewRowTooltipLabel4: 'Étendu',
        defaultViewRowTooltipLabel5: 'Ouvrir street-view dans un panneau coulissant mobile, idéal pour mobile',
        defaultViewRowPlaceholder: 'Sélectionner la vue initiale',
        defaultViewOptionExpanded: 'Étendu',
        defaultViewOptionReduced: 'Réduit',

        /**
         * Street View Api section
         */

        streetViewSectionTooltipLabel: "Modifier les paramètres de l'API Google Map Embed, voir ",
        streetViewSectionTooltipLinkLabel: 'documentation',
        streetViewSectionTooltipLink:
          'https://developers.google.com/maps/documentation/embed/embedding-map#streetview_mode',

        headingRowLabel: 'Orientation',
        headingRowTooltipLabel1:
          "Indique l'orientation de la boussole de la caméra. Les valeurs acceptées vont de 0 à 360 (les deux valeurs indiquant le Nord, 90 indiquant l'Est et 180 le Sud). Si vous ne spécifiez pas d'orientation, une valeur est calculée pour diriger la caméra vers l'emplacement spécifié, depuis le point où la photo la plus proche a été prise.",
        headingRowTooltipLabel2: 'Par défaut : 210°',

        pitchRowLabel: 'Inclinaison',
        pitchRowTooltipLabel1:
          "Spécifie l'angle vers le haut ou vers le bas de la caméra par rapport au véhicule Street View. Cet angle est souvent, mais pas toujours, horizontal. Les valeurs positives inclinent la caméra vers le haut (90 degrés indiquant la verticale) ; les valeurs négatives l'inclinent vers le bas (-90 indiquant la verticale vers le bas).",
        pitchRowTooltipLabel2: 'Par défaut : 0°',

        radiusRowLabel: 'Rayon',
        radiusRowTooltipLabel1:
          "Définit un rayon, exprimé en mètres, dans lequel rechercher une imagerie, centré sur la latitude et la longitude données. Les valeurs valides sont des entiers positifs ou nuls.",
        radiusRowTooltipLabel2: 'Par défaut : 50m',

        fovRowLabel: 'Champ de vision',
        fovRowTooltipLabel1:
          "Détermine le champ de vision horizontal de l'image exprimé en degrés, avec une valeur maximale autorisée de 120. Pour une fenêtre de taille fixe, comme une image Street View de taille définie, le champ de vision représente essentiellement le zoom, les valeurs plus petites indiquant un niveau de zoom plus élevé.",
        fovRowTooltipLabel2: 'Par défaut : 90°',

        sourceRowLabel: 'Source',
        sourceRowTooltipLabel1: 'Limite les recherches Street View à la source sélectionnée.',
        sourceRowTooltipLabel2:
          "Tout utilise les sources par défaut pour Street View ; les recherches ne sont pas limitées à des sources spécifiques.",
        sourceRowTooltipLabel3:
          "Extérieur limite les recherches aux collections extérieures. Les collections intérieures ne sont pas incluses dans les résultats de recherche.",
        sourceRowTooltipLabel4: 'Par défaut : Extérieur',
        sourceRowSelectOptionLabel1: 'Extérieur',
        sourceRowSelectOptionLabel2: 'Tout',

        /**
        * Credit Section
        */

        creditLabel1: 'Fais avec ♥ par ',
        creditLinkLabel1: 'Smart/Origin',
        creditLabel2: 'Disponible sur ',
        creditLinkLabel2: 'Github'
      })
    }
  }
})
