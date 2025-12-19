System.register([], function (_export) {
  return {
    execute: function () {
      _export({
        _widgetLabel: 'Street View',

        streetViewUnavailableErrorLabel:
          'Aucune image Street View disponible ici.',
        googleApiKeyNotFoundErrorLabel: 'Clé API Google introuvable'
      });
    }
  };
});
