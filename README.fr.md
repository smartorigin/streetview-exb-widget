<div align="center">
  <img src="./docs/assets/icon.svg" alt="logo" width="150" height="auto" />
  <h1>Widget Google Street View</h1>
  
  <p>
    Conçu pour ArcGIS Experience Builder
  </p>
  <p>
    <a href="">
      <img src="https://img.shields.io/github/contributors/smartorigin/streetview-exb-widget" alt="contributeurs" />
    </a>
    <a href="">
      <img src="https://img.shields.io/github/license/smartorigin/streetview-exb-widget" alt="licence" />
    </a>
  </p>
</div>

<br>

## À propos

![DemoGif1](./docs/assets/Demo1.gif)

Intègre Google Street View dans vos applications ArcGIS Experience Builder. Cliquez sur la carte pour ouvrir Street View à cette emplacement, ou accèder à Street View directement depuis les actions d'une entité sélectioné.

## Fonctionnalités

- **Intégration carte** : Ouvre StreetView à l'emplacement cliqué.
- **Actions popup** : S'intègre aux popups ArcGIS, ajoutant une action "Ouvrir dans Street View" à vos entités.
- **Design responsive** : Propose deux modes d'affichage :
  - **Réduit** : Un panneau flottant, pour une utilisation sur ordinateur.
  - **Étendu** : Un panneau glissant pleine largeur, pour les appareils mobiles.
- **Configuration** : Propose deux préréglages "Click to View" et "Action popup" pour configurer rapidement le widget selon votre cas d'utilisation.
- **Liens externes** : Permet d'ouvrir la vue actuelle directement dans Google Maps.
- **Internationalisation** : Entièrement traduit en français (`fr`) et en anglais (`en`).
- **Panneau de contrôle flottant** : Panneau de controle pour activer/désactiver le widget depuis l'application.

## Prérequis

Les prérequis à l'utilisation de ce widget :

**Clé API Google**

Le widget utilise l'[API Maps Embed](https://developers.google.com/maps/documentation/embed/get-started) de Google pour afficher l'imagerie Street View.

1. Rendez-vous sur la [Console Google Cloud](https://console.cloud.google.com/)
2. Créer un projet (ou utiliser un projet existant)
3. Aller dans **APIs & Services** > **Bibliothèque** et activer **Maps Embed API**
4. Aller dans **APIs & Services** > **Identifiants** et créer une clé API

> [!NOTE]
> La facturation sur votre compte Google Cloud doit etre activé pour générer une clée.

## Utilisation

Le widget deux modes d'utilisations et de préréglage, configurable via l'onglet des paramètres du widget dans Experience Builder.

### Click to View (par défaut)

Tout clic sur la carte ouvre Street View à cet emplacement dans un panneau flottant, c'est le préréglage par défaut.

> [!NOTE]
> Vous pouvez activer et désactiver le widget via le panneau de contrôle flottant en bas à droite de l'écran
>
> ![DemoGifUsage1](./docs/assets/DemoGifUsage1.gif)

### Action popup

Street View s'ouvre uniquement lorsque vous cliquez sur le bouton "Ouvrir dans Street View" dans une popup d'entité. Les clics sur la carte fonctionnent normalement sans déclencher Street View (vous pouvez toujours l'activer via les paramètres).

> [!NOTE]
>
> ![DemoGifPopupAction](./docs/assets/DemoGifPopupAction.gif)

> [!TIP]
> L'action "Ouvrir dans Street View" sera aussi présente dans le mode "Click to View", ce mode existe spécifiquement pour les utilisateurs qui ne souhaitent pas utiliser la fonctionnalité de clic sur la carte ou voir un panneau de contrôle permanent

## Installation

### Dans ArcGIS Experience Builder Developer Edition

Ce widget est compatible avec Experience Builder v1.16+. Téléchargez-le depuis la [page de téléchargements](https://developers.arcgis.com/experience-builder/guide/downloads/) et suivez le [guide d'installation](https://developers.arcgis.com/experience-builder/guide/install-guide/).

> [!NOTE]
> Vous aurez besoin de Node.js >=22 et npm pour installer Experience Builder

#### Méthode Dist

Idéale pour une utilisation rapide sans modification du code.

1. Téléchargez la dernière [version](https://github.com/smartorigin/streetview-exb-widget/releases)
2. Extrayez le zip téléchargé et copiez le dossier `street-view` dans le dossier dist d'Experience Builder (`<votre-exb>/client/dist/widgets`)
3. Ajoutez l'objet JSON trouvé dans `to-copy-in-widgets-info.json` dans `<votre-exb>/client/dist/widgets/widgets-info.json` (_nécessaire uniquement lors de la première installation_)

#### Méthode Your Extensions

Idéale pour les développeurs qui souhaitent modifier le code source.

1. Cloner le dépôt sur votre ordinateur

```bash
git clone git@github.com:smartorigin/streetview-exb-widget.git
```

2. Copier le dossier `street-view` dans le dossier widgets d'Experience Builder (`client/your-extensions/widgets`)
3. Redémarrer le client Experience Builder (via `npm start`)
4. Le widget devrait apparaître dans votre panneau de widgets après rechargement de la page

### Dans votre propre instance de Portal for ArcGIS

Depuis ArcGIS Enterprise 11, vous pouvez référencer vos propres widgets ArcGIS Experience Builder dans votre Portal for ArcGIS.

1. Téléchargez la dernière [version](https://github.com/smartorigin/streetview-exb-widget/releases)
2. Extrayez le zip téléchargé et déployez le dossier `street-view` sur un serveur web.
3. Vous devriez maintenant avoir une URL qui pointe vers le fichier `manifest.json` dans le dossier `street-view`.
4. Allez dans le menu `Contenu` de votre Portal for ArcGIS.
5. Cliquez sur `Ajouter un élément`, puis sélectionnez `Ajouter une URL de widget Experience Builder`.
6. Spécifiez l'URL obtenue à l'étape 3.

## Configuration

### Prérequis

Glissez-déposez le widget dans votre application.

> [!TIP]
> Pour lier automatiquement le widget à votre carte, glissez-déposez-le sur le widget carte.

### Options de source

| Paramètre                  | Description                                                                   |
| -------------------------- | ----------------------------------------------------------------------------- |
| **Sélectionner une carte** | Choisissez le widget carte à lier avec Street View.                           |
| **Clé API Google**         | Entrez votre clé API Google Maps (requise pour les intégrations Street View). |

### Options générales

| Paramètre                                   | Défaut           | Description                                                                                                                                                                                                      |
| ------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Préréglage**                              | `Clic pour voir` | Choisissez rapidement entre deux comportements principaux : <br>• **Clic pour voir** : Ouvre Street View sur tout clic sur la carte. <br>• **Action popup** : Ouvre Street View uniquement via une action popup. |
| **Activer l'action popup**                  | `true`           | Ajoute une action "Ouvrir dans Street View" aux popups d'entités.                                                                                                                                                |
| **Activer le clic sur la carte**            | `true`           | Permet d'ouvrir Street View en cliquant n'importe où sur la carte.                                                                                                                                               |
| **Activer l'icône de position**             | `true`           | Affiche un marqueur sur la carte indiquant l'emplacement et la direction actuels de Street View.                                                                                                                 |
| **Activer le panneau de contrôle flottant** | `true`           | Affiche un bouton flottant pour activer/désactiver le widget.                                                                                                                                                    |
| **État par défaut du panneau de contrôle**  | `off`            | Définit si le widget démarre actif (`on`) ou inactif (`off`).                                                                                                                                                    |
| **Vue par défaut**                          | `Réduit`         | Choisissez le mode d'affichage initial : <br>• **Réduit** : Panneau flottant (idéal pour ordinateur). <br>• **Étendu** : Panneau coulissant pleine hauteur (idéal pour mobile).                                  |

### Options de l'API Street View

| Paramètre   | Défaut    | Description                                                                                                                                                                                                                                                                                               |
| ----------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Heading** | `210°`    | Indique la direction prise par la boussole dans la vue de l'appareil photo. Les valeurs peuvent varier de `0` à `360`. Si vous ne spécifiez pas de direction, une valeur est calculée de façon à diriger l'appareil photo vers le location spécifié, selon l'angle de vue de la photo prise au plus près. |
| **Pitch**   | `0°`      | Spécifie l'angle vers le haut ou le bas de la caméra par rapport au véhicule Street View.                                                                                                                                                                                                                 |
| **FOV**     | `90°`     | Détermine le champ de vision horizontal de l'image exprimé en degrés, avec une valeur maximale autorisée de `120`.                                                                                                                                                                                        |
| **Radius**  | `50m`     | Définit un rayon, spécifié en mètres, dans lequel rechercher de l'imagerie, centré sur la latitude et la longitude données. Les valeurs valides sont des entiers non négatifs. (Un grand rayon pousse l'API à sélectionner des images statiques plutôt que non statiques).                                |
| **Source**  | `Outdoor` | `All` utilise les sources par défaut pour Street View ; les recherches ne sont pas limitées à des sources spécifiques. `Outdoor` limite les recherches aux collections extérieures. Les collections d'intérieur ne sont pas incluses dans les résultats de recherche.                                     |

## Feuille de route

- [x] ~~Support de la langue française~~

## Demandes de fonctionnalités

Vous avez une idée pour une nouvelle fonctionnalité ? Ouvrez une issue avec le label `feature request` et décrivez ce que vous aimeriez voir.

## FAQ

<details>
  <summary>Que faire si j'ai deux widgets carte dans mon expérience ?</summary>
  Ajoutez ce widget deux fois, un pour chaque carte.
</details>

## Structure du projet

```
src/street-view/
├── icon.svg              # Icône du widget pour le menu EXB
├── manifest.json         # Métadonnées du widget
├── config.ts             # Types de configuration
└── src/
    ├── setting/          # Interface du panneau de paramètres
    └── runtime/
        ├── widget.tsx    # Composant principal du widget
        ├── views/        # Composants UI
        ├── services/     # Logique carte et Street View
        ├── hooks/        # Hooks React
        ├── types/        # Types TypeScript
        ├── translations/ # Chaînes i18n
        ├── utils/        # Fonctions utilitaires
        └── css/          # Styles
```

## Licence

[Licence Apache-2.0](./LICENSE)
