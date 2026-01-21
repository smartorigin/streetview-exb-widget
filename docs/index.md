---
layout: article
title: Google Street View Widget
permalink: /
header: true
show_date: false
show_tags: false
article_header:
  type: overlay
  theme: dark
  background_color: '#123'
  background_image: false
---

This widget brings [Google Street View](https://www.google.fr/intl/fr/streetview/) into your [ArcGIS Experience Builder](https://developers.arcgis.com/experience-builder/) applications. Click anywhere on the map to see street-level imagery, or open Street View directly from feature actions in popup.
{:.text-center}

![Image](/assets/demo-1.gif){:.shadow.rounded.mt-3}

<h1 class="my-5 text-center">
  Features
</h1>

<h3>
  <i class="fas fa-mobile-screen fa-lg mr-1" style="color: #076fe5 !important"></i>
  Expandable Mobile Panel
</h3>

This widget brings **Google Street View** into your [ArcGIS Experience Builder](https://developers.arcgis.com/experience-builder/) applications. Click anywhere on the map to see street-level imagery, or open Street View directly from feature actions in popup.

![Image](/assets/demo-mobile-panel.gif){:.shadow.rounded}

---

<h3>
  <i class="fas fa-map-location fa-lg mr-1" style="color: #076fe5 !important"></i>
  Popup Action Integration
</h3>

This widget brings **Google Street View** into your [ArcGIS Experience Builder](https://developers.arcgis.com/experience-builder/) applications. Click anywhere on the map to see street-level imagery, or open Street View directly from feature actions in popup.

![Image](/assets/demo-popup-action.gif){:.shadow.rounded}

---

<h3>
  <i class="fas fa-arrow-up-right-from-square fa-lg mr-1" style="color: #076fe5 !important"></i>
  Open in Google Maps
</h3>

This widget brings **Google Street View** into your [ArcGIS Experience Builder](https://developers.arcgis.com/experience-builder/) applications. Click anywhere on the map to see street-level imagery, or open Street View directly from feature actions in popup.

![Image](/assets/demo-open-in-gm.gif){:.shadow.rounded}

---

<h1 class="my-5 text-center">
  Installation
</h1>

### In ArcGIS Experience Builder Developer Edition

This widget is compatible with Experience Builder v1.16+. Grab it from the [downloads page](https://developers.arcgis.com/experience-builder/guide/downloads/) and follow the [setup guide](https://developers.arcgis.com/experience-builder/guide/install-guide/).

<div class="alert alert-note">
<p><strong>Note</strong></p>
<p>You'll need Node.js >=22 and npm to install experience builder</p>
</div>

#### Dist Method

Best for quick use without code modifications.

1. Download latest [release](https://github.com/smartorigin/streetview-exb-widget/releases)
2. Extract the downloaded zip and copy the `street-view` folder into experience builder dist folder (`<your-exb>/client/dist/widgets`)
3. Add the json object found in `to-copy-in-widgets-info.json` into `<your-exb>/client/dist/widgets/widgets-info.json` (_only needed at first install_)

#### Your Extensions Method

Best for developers who want to modify the source code.

1. Clone the repo on your computer

```bash
git clone git@github.com:smartorigin/streetview-exb-widget.git
```

2. Copy the `street-view` folder into experience builder widgets folder (`client/your-extensions/widgets`)
3. Restart the Experience Builder client (via `npm start`)
4. The widget should appear in your widget panel after page reload

### In your own instance of portal for ArcGIS

Since ArcGIS Enterprise 11 you can reference your own ArcGIS Experience builder widgets in your portal for ArcGIS.

1. Download latest [release](https://github.com/smartorigin/streetview-exb-widget/releases)
2. Extract the downloaded zip and deploy the `street-view` folder to a webserver.
3. You should now have an url that points to the `manifest.json` file inside `street-view` folder.
4. Go to the `Contents` menu of your Portal for ArcGIS.
5. Click `add item`, the select the `add an Experience Builder Widget URL`.
6. Specify the url got at step 3.
