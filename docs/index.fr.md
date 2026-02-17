---
layout: article
title: Widget Google Street View
permalink: /fr
lang: fr
header: false
show_date: false
show_tags: false
article_header:
  type: overlay
  theme: dark
  background_color: '#123'
  background_image: false
---

<h2 class="text-center">À propos</h2>

Ce widget intègre [Google Street View]() dans vos applications [ArcGIS Experience Builder](). Cliquez sur la carte pour ouvrir Street View à cet emplacement, ou directement depuis l'action « Ouvrir dans Street View » d'une entité sélectionnée.
{:.text-center}

![DemoGif](/assets/demo-general.gif){:.shadow.rounded.mt-3-5.w-100}

<h2 class="my-5 text-center">Démo Interactive</h2>

<iframe class="w-100" style="height: 500px" src="https://gis.smart-origin.com/portal/apps/experiencebuilder/experience/?id=52a8cbfc012c429389b34b3c28577e48"></iframe>

<p class="text-center">
  <small>
  Données open-source récupéré sur le <a href="https://data.metropolegrenoble.fr/portail">portail data</a> de la métropole de grenbole.
  </small>
</p>

<h2 class="my-5 text-center">Fonctionnalités</h2>

<div class="features-grid">
  <div class="feature-item">
    <h3>
      <i class="fas fa-map-marker-alt fa-lg mr-1" style="color: #076fe5 !important"></i>
      Intégration carte
    </h3>
    <p>Cliquez n'importe où sur une carte lié au widget pour ouvrir Street View à cet emplacement.</p>
  </div>

  <div class="feature-item">
    <h3>
      <i class="fas fa-arrow-up-right-from-square fa-lg mr-1" style="color: #076fe5 !important"></i>
      Liens externes
    </h3>
    <p>Ouvrez la vue actuelle directement dans Google Maps pour une exploration plus approfondie.</p>
    <!-- <img src="{{ '/assets/demo-open-in-gm.gif' | relative_url }}" alt="Démo liens externes" class="shadow rounded w-100"> -->
  </div>

  <div class="feature-item">
    <h3>
      <i class="fas fa-map-location fa-lg mr-1" style="color: #076fe5 !important"></i>
      Actions popup
    </h3>
    <p>S'intègre aux popups ArcGIS et à vos couches de données, ajoutant une action <code>Ouvrir dans Street View</code> à vos entités.</p>
    <img src="{{ '/assets/demo-popup-action.gif' | relative_url }}" alt="Démo action popup" class="shadow rounded w-100">
  </div>

  <div class="feature-item">
    <h3>
      <i class="fas fa-mobile-screen fa-lg mr-1" style="color: #076fe5 !important"></i>
      Design responsive
    </h3>
    <p>Deux modes d'affichage : <strong>Réduit</strong> (panneau flottant pour ordinateur) et <strong>Étendu</strong> (panneau pleine hauteur pour mobile).</p>
    <img src="{{ '/assets/demo-mobile-panel.gif' | relative_url }}" alt="Démo design responsive" class="shadow rounded w-100">
  </div>

  <div class="feature-item feature-item-wide">
    <h3>
      <i class="fas fa-gear fa-lg mr-1" style="color: #076fe5 !important"></i>
      Configurable
    </h3>
    <p>Deux préréglages (<code>Click to View</code> et <code>Action popup</code>) pour configurer rapidement le widget selon votre cas d'utilisation. Contrôle complet sur la position de la caméra, les éléments d'interface et le comportement.</p>
    <img src="{{ '/assets/demo-config.gif' | relative_url }}" alt="Démo configuration" class="shadow rounded w-100">
  </div>
</div>

---

<h2 id="installation" class="my-5 text-center">Installation</h2>

### Dans ArcGIS Experience Builder Developer Edition

#### 1. Méthode Dist

Idéale pour une utilisation rapide sans modification du code source.

1. Téléchargez la dernière [version](https://github.com/smartorigin/streetview-exb-widget/releases)

   <a class="button button--primary button--rounded" href="https://github.com/smartorigin/streetview-exb-widget/releases/download/v1.0.0-beta/street-view-1_0_0.zip"><i class="fas fa-download"></i> Télécharger la version</a>

2. Extrayez et copiez le dossier `street-view` dans `<votre-exb>/client/dist/widgets`
3. Ajoutez l'objet JSON de `to-copy-in-widgets-info.json` dans `<votre-exb>/client/dist/widgets/widgets-info.json` (première installation uniquement)

#### 2. Méthode Your Extensions

Idéale pour les développeurs qui souhaitent modifier le code source.

1. Clonez le dépôt :

```bash
git clone git@github.com:smartorigin/streetview-exb-widget.git
```

2. Copiez le dossier `street-view` dans `<votre-exb>/client/your-extensions/widgets`
3. Redémarrez le client Experience Builder (`npm start`)
4. Le widget apparaît dans votre panneau de widgets après rechargement de la page

### Dans Portal for ArcGIS

Depuis ArcGIS Enterprise 11, vous pouvez référencer des widgets personnalisés dans votre Portal for ArcGIS.

1. Téléchargez la dernière [version](https://github.com/smartorigin/streetview-exb-widget/releases)
2. Extrayez et déployez le dossier `street-view` sur un serveur web
3. Obtenez l'URL pointant vers le fichier `manifest.json` dans le dossier `street-view`
4. Dans Portal, allez dans **Contenu** > **Ajouter un élément** > **Ajouter une URL de widget Experience Builder**
5. Spécifiez l'URL de l'étape 3

---

<h2 class="my-5 text-center">FAQ</h2>

**Que faire si j'ai deux widgets carte dans mon expérience ?**

Ajoutez ce widget deux fois, un pour chaque carte.

**Comment obtenir une clé API Google ?**

Consultez la section [Prérequis](#prerequisites) ci-dessus pour les instructions détaillées.

**Puis-je personnaliser l'apparence du widget ?**

Le widget s'adapte à votre thème Experience Builder. Vous pouvez contrôler la visibilité des éléments d'interface via les paramètres de configuration.

---

<h2 class="my-5 text-center">En savoir plus</h2>

<div class="d-flex justify-content-center gap-4" >
  <a href="https://github.com/smartorigin/streetview-exb-widget/blob/nma/dev/README.fr.md">
    <div class="card card--clickable" style="max-width: 500px;">
      <div class="card__content">
        <div class="card__header" style="display: flex; align-items: center; gap: 0.75rem;">
          <i class="fas fa-book fa-lg" style="color: #076fe5 !important"></i>
          <h5 style="margin: 0;">Documentation</h5>
        </div>
      </div>
    </div>
  </a>
  <a href="https://developers.google.com/maps/documentation/embed/embedding-map">
    <div class="card card--clickable" style="max-width: 500px;">
      <div class="card__content">
        <div class="card__header" style="display: flex; align-items: center; gap: 0.75rem;">
          <i class="fab fa-google fa-lg" style="color: #076fe5 !important"></i>
          <h5 style="margin: 0;">API Google Documentation</h5>
        </div>
      </div>
    </div>
  </a>
</div>

---
