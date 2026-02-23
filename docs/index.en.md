---
layout: article
title: Google Street View Widget
permalink: /en
lang: en
header: false
show_date: false
show_tags: false
article_header:
  type: overlay
  theme: dark
  background_color: '#123'
  background_image: false
---

<h2 class="text-center">About</h2>

This widget brings [Google Street View]() into your [ArcGIS Experience Builder]() applications. Click anywhere on the map to see street-level imagery, or open Street View directly from feature actions in popups.
{:.text-center}

![IllustrationGif](/assets/illustration.gif){:.shadow.rounded.mt-3-5.w-100}

<h2 class="my-5 text-center">Live Demo</h2>

<iframe class="w-100" style="height: 500px" src="https://gis.smart-origin.com/portal/apps/experiencebuilder/experience/?id=52a8cbfc012c429389b34b3c28577e48"></iframe>

<p class="text-center">
  <small>
  Open-source data obtained on Grenoble's <a href="https://data.metropolegrenoble.fr/portail">data portal</a>.
  </small>
</p>

<h2 class="my-5 text-center">Features</h2>

<div class="features-grid">
  <div class="feature-item">
    <h3>
      <i class="fas fa-map-marker-alt fa-lg mr-1" style="color: #076fe5 !important"></i>
      Map Integration
    </h3>
    <p>Click anywhere on the map to instantly open Google Street View at that location.</p>
  </div>

  <div class="feature-item">
  <h3>
      <i class="fas fa-arrow-up-right-from-square fa-lg mr-1" style="color: #076fe5 !important"></i>
      External Links
    </h3>
    <p>Open the current view directly in Google Maps for further exploration.</p>
    <!-- <img src="{{ '/assets/demo-open-in-gm.gif' | relative_url }}" alt="External Links Demo" class="shadow rounded w-100"> -->
  </div>

  <div class="feature-item">
    <h3>
      <i class="fas fa-map-location fa-lg mr-1" style="color: #076fe5 !important"></i>
      Popup Actions
    </h3>
    <p>Integrates with ArcGIS popups and your data layers, adding an <code>Open in Street View</code> action to your features.</p>
    <img src="{{ '/assets/demo-popup-action.gif' | relative_url }}" alt="Popup Action Demo" class="shadow rounded w-100">
  </div>

  <div class="feature-item">
    <h3>
      <i class="fas fa-mobile-screen fa-lg mr-1" style="color: #076fe5 !important"></i>
      Responsive Design
    </h3>
    <p>Two viewing modes: <strong>Reduced</strong> (floating panel for desktop) and <strong>Expanded</strong> (full-height panel for mobile).</p>
    <img src="{{ '/assets/demo-mobile-panel.gif' | relative_url }}" alt="Responsive Design Demo" class="shadow rounded w-100">
  </div>

  <div class="feature-item feature-item-wide">
    <h3>
      <i class="fas fa-gear fa-lg mr-1" style="color: #076fe5 !important"></i>
      Configurable
    </h3>
    <p>Two presets (<code>Click to View</code> and <code>Popup Action</code>) to quickly configure the widget based on your use case. Full control over camera position, UI elements, and behavior.</p>
    <img src="{{ '/assets/demo-config.gif' | relative_url }}" alt="Configuration Demo" class="shadow rounded w-100">
  </div>
</div>

---

<h2 class="my-5 text-center">Use Cases</h2>

<div class="use-case-tabs" role="tablist" aria-label="Use cases">
  <button class="use-case-tab is-active" type="button" role="tab" aria-selected="true" data-use-case-tab="1">
    Networks and transit
  </button>
  <button class="use-case-tab" type="button" role="tab" aria-selected="false" data-use-case-tab="2">
    Green access
  </button>
  <button class="use-case-tab" type="button" role="tab" aria-selected="false" data-use-case-tab="3">
    Street assets
  </button>
</div>

<div class="use-case-panel is-active" role="tabpanel" data-use-case-panel="1">
  <img src="{{ '/assets/use-cage-1.png' | relative_url }}" alt="Use case 1" loading="lazy" />
</div>

<div class="use-case-panel" role="tabpanel" data-use-case-panel="2">
  <img src="{{ '/assets/use-case-3.png' | relative_url }}" alt="Use case 2" loading="lazy" />
</div>

<div class="use-case-panel" role="tabpanel" data-use-case-panel="3">
  <img src="{{ '/assets/use-case-2.png' | relative_url }}" alt="Use case 3" loading="lazy" />
</div>

<script defer>
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = Array.from(document.querySelectorAll('[data-use-case-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-use-case-panel]'));

    if (!tabs.length || !panels.length) {
      return;
    }

    const activate = (id) => {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.useCaseTab === id;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      panels.forEach((panel) => {
        const isActive = panel.dataset.useCasePanel === id;
        panel.classList.toggle('is-active', isActive);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activate(tab.dataset.useCaseTab);
      });
    });
  });
</script>

Having immersive views directly available in your GIS application enables geomatics teams and local authorities to:

- Contribute to the inventory of GIS reference assets: roads, signage, tree assets, street furniture, networks, transport infrastructure, streets, and addresses.
- Review, correct, and improve data quality from providers or previous field surveys.
- Reposition a record within its environment and geographic context.
- Diagnose situations remotely to reduce field travel.
- Compare two dates or captures to track urban evolution.
- Illustrate planning files and support urban planning reviews.

We are convinced many more use cases remain to be imagined, especially as GIS tools are adopted across departments and with automated detection of heritage assets.

---

<h2 id="installation" class="my-5 text-center">Installation</h2>

### In ArcGIS Experience Builder Developer Edition

#### 1. Dist Method

Best for quick use without code modifications.

1. Download the latest [release](https://github.com/smartorigin/streetview-exb-widget/releases/latest)

   <a class="button button--primary button--rounded" href="https://github.com/smartorigin/streetview-exb-widget/releases/latest/download/street-view-1.0.0-exb_1.19.zip"><i class="fas fa-download"></i> Download Release</a>

2. Extract and copy the `street-view` folder to `<your-exb>/client/dist/widgets`
3. Add the JSON object from `to-copy-in-widgets-info.json` to `<your-exb>/client/dist/widgets/widgets-info.json` (first install only)

#### 2. Your Extensions Method

Best for developers who want to modify the source code.

1. Clone the repository:

```bash
git clone git@github.com:smartorigin/streetview-exb-widget.git
```

1. Copy the `street-view` folder to `<your-exb>/client/your-extensions/widgets`
2. Restart the Experience Builder client (`npm start`)
3. The widget appears in your widget panel after page reload

### In your own instance of Portal for ArcGIS

Since ArcGIS Enterprise 11, you can reference your own ArcGIS Experience Builder widgets in your Portal for ArcGIS.

#### 1. Without hosting

<div class="alert alert-warning">
  <p>Warning</p>
  <p>This method has not been implemented yet.</p>
</div>

Use the widget release URL hosted by Smart/Origin:

`https://<smart-origin-host>/street-view/manifest.json`

1. In Portal, go to `My Content` and click `Add Item` > `An application`.
2. Choose `Experience Builder widget`.
3. Paste the Smart/Origin manifest URL, add tags, and click `Add Item`.

#### 2. With hosting

1. Download the latest [release](https://github.com/smartorigin/streetview-exb-widget/releases/latest)
2. Extract and deploy the `street-view` folder to a web server.
3. Make sure you have a public URL to the `manifest.json` file (example: `https://<server>/<my-widget>/manifest.json`).
4. In Portal, go to `My Content` and click `Add Item` > `An application`.
5. Choose `Experience Builder widget`, paste the manifest URL, add tags, and click `Add Item`.

<div class="alert alert-tip">
  <p>Tip</p>
  <p>For more details, see the official guide: <a href="https://doc.arcgis.com/en/experience-builder/12.0/configure-widgets/add-custom-widgets.htm">Add custom widgets</a></p>
</div>

---

<h2 class="my-5 text-center">Found something? Tell us</h2>

Found a bug, unexpected behavior, or have an idea for improvement?

Please use [GitHub Issues](https://github.com/smartorigin/streetview-exb-widget/issues) to send us your report.

---

<h2 class="my-5 text-center">FAQ</h2>

**What if I have two map widgets in my experience?**

Add this widget twice, once for each map.

**How do I get a Google API key?**

See the [Prerequisites](#prerequisites) section above for step-by-step instructions.

---

<h2 class="my-5 text-center">Learn More</h2>

<div class="d-flex justify-content-center gap-4" >
  <a href="https://github.com/smartorigin/streetview-exb-widget/blob/main/README.md">
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
          <h5 style="margin: 0;">Google's API Documentation</h5>
        </div>
      </div>
    </div>
  </a>
</div>

---
