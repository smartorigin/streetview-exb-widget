System.register([], (_export) => {
  return {
    execute: () => {
      _export({
        _widgetLabel: 'Street View',

        streetViewUnavailableErrorLabel:
          'Aucune image Street View disponible ici.',
        googleApiKeyNotFoundErrorLabel: 'Clé API Google introuvable',
        mapNotSelectedErrorLabel: 'Pas de carte sélectionnée'
      });
    }
  };
});
