<div align="center">
  <img src="./docs/assets/icon.svg" alt="logo" width="150" height="auto" />
  <h1>Google Street View Widget</h1>
  
  <p>
    Built for ArcGIS Experience Builder  —  Made with ❤️ by <a href="https://smart-origin.com/">Smart/Origin</a>
  </p>
  <p>
    <a href="https://github.com/smartorigin/streetview-exb-widget/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/smartorigin/streetview-exb-widget" alt="contributors" />
    </a>
    <a href="https://github.com/smartorigin/streetview-exb-widget/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/smartorigin/streetview-exb-widget" alt="license" />
    </a>
  </p>
  
  <p>
    <a href="README.md">English</a> • <a href="README.fr.md">Français</a>
  </p>
</div>

<br>

## About

![DemoGif1](./docs/assets/Demo1.gif)

This widget brings Google Street View into your ArcGIS Experience Builder applications. Click anywhere on the map to see street-level imagery, or open Street View directly from feature actions in popups.

## Features

- **📍 Map Integration**: Click anywhere on the map to instantly open Google Street View at that location.
- **🖱️ Popup Actions**: Integrates with ArcGIS popups, adding an "Open in Street View" action to your features.
- **📱 Responsive Design**: Offers two viewing modes:
  - **Reduced**: A non-intrusive floating panel, perfect for desktop use.
  - **Expanded**: A full-height side panel, optimized for mobile devices.
- **⚙️ Configuration**: Offers two presets "Click to View" and "Popup Action" to quickly configure the widget based on your use case.
- **🔗 External Links**: Option to open the current view directly in Google Maps for further exploration.
- **🌍 Internationalization**: The widget is translated into English and French.
- **🎛️ Floating Control Panel**: Control panel to enable/disable the widget from the application.

## Prerequisites

What you will need to use this widget:

**ArcGIS Experience Builder**

This widget is designed for ArcGIS Experience Builder v1.16+. You can download it from the [downloads page](https://developers.arcgis.com/experience-builder/guide/downloads/) and follow the [installation guide](https://developers.arcgis.com/experience-builder/guide/install-guide/).

> [!NOTE]
> You'll need Node.js >=22 and npm to install Experience Builder

**A Google API Key**

The widget uses Google's [Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started) to display Street View imagery.

1. Head to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or use an existing one)
3. Go to **APIs & Services** > **Library** and enable **Maps Embed API**
4. Go to **APIs & Services** > **Credentials** and create an API key

> [!NOTE]
> You'll need billing enabled on your Google Cloud account.

## Usage

The widget offers two presets corresponding to two usage modes, however it is possible to configure the widget differently via the widget settings tab in Experience Builder.

### 👆 Click to View (default)

When the map is clicked, display Street View imagery at that location, this is the default preset.

> [!NOTE]
> You can disable opening Street View on click via the floating control panel at the bottom right of the screen.
>
> ![DemoGifUsage1](./docs/assets/DemoGifUsage1.gif)

### ▶️ Popup Action

Street View opens only via the "Open in Street View" action in a feature popup. Allows easy access to Street View imagery of a feature.

> [!NOTE]
>
> ![DemoGifPopupAction](./docs/assets/DemoGifPopupAction.gif)

> [!TIP]
> The "Open in Street View" action will also be present in "Click to View" mode, this mode exists specifically for users who do not wish to use the Click to View feature.

## Installation

### In ArcGIS Experience Builder Developer Edition

This widget is compatible with Experience Builder v1.16+. Follow the [installation guide](https://developers.arcgis.com/experience-builder/guide/install-guide/) to install Experience Builder.

> [!NOTE]
> You'll need Node.js >=22 and npm to install Experience Builder

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

2. Copy the `src/street-view` folder into experience builder widgets folder (`<your-exb>/client/your-extensions/widgets`)
3. Restart the Experience Builder client (via `npm start`)
4. The widget should appear in your widget panel after page reload

### In your own instance of Portal for ArcGIS

Since ArcGIS Enterprise 11 you can reference your own ArcGIS Experience Builder widgets in your Portal for ArcGIS.

1. Download latest [release](https://github.com/smartorigin/streetview-exb-widget/releases)
2. Extract the downloaded zip and deploy the `street-view` folder to a webserver.
3. You should now have a URL that points to the `manifest.json` file inside `street-view` folder.
4. Go to the `Contents` menu of your Portal for ArcGIS.
5. Click `Add item`, then select `Add an Experience Builder Widget URL`.
6. Specify the URL got at step 3.

## Configuration

### Prerequisites

Drag and drop the widget inside your app.

> [!TIP]
> To automatically bind the widget to your map, drag and drop it onto the map widget.

### Source options

| Setting            | Description                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| **Select a map**   | Choose the map widget to link with Street View, done automatically if a map is present. |
| **Google API key** | Enter your Google Maps API key (required).                                              |

### General Options

| Setting                           | Default         | Description                                                                                                                                                                |
| --------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Preset**                        | `Click To View` | Quickly choose between two main behaviors: <br>• **Click To View**: Opens Street View on any map click. <br>• **Popup Action**: Opens Street View only via a popup action. |
| **Enable popup action**           | `true`          | Enables adding an "Open in Street View" action to feature popups.                                                                                                          |
| **Enable map click**              | `true`          | Allows opening Street View by clicking anywhere on the map.                                                                                                                |
| **Enable position icon**          | `true`          | Shows a marker on the map indicating the current Street View location and heading.                                                                                         |
| **Enable floating control panel** | `true`          | Shows a floating button to toggle the widget on/off.                                                                                                                       |
| **Default control panel state**   | `off`           | Sets whether the widget starts active (`on`) or inactive (`off`).                                                                                                          |
| **Default view**                  | `Reduced`       | Choose the initial display mode: <br>• **Reduced**: Floating panel (best for desktop). <br>• **Expanded**: Full-height sliding panel (best for mobile).                    |

### Street View API Options

| Setting     | Default   | Description                                                                                                                                                                                                                                         |
| ----------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Heading** | `210°`    | Indicates the compass heading of the camera view. Values can range from `0` to `360`. If you don't specify a heading, a value is calculated that directs the camera towards the specified location, from the angle of the closest photograph taken. |
| **Pitch**   | `0°`      | Specifies the up or down angle of the camera relative to the Street View vehicle.                                                                                                                                                                   |
| **FOV**     | `90°`     | Determines the horizontal field of view of the image expressed in degrees, with a maximum allowed value of `120`.                                                                                                                                   |
| **Radius**  | `50m`     | Defines a radius, specified in meters, in which to search for imagery, centered on the given latitude and longitude. Valid values are non-negative integers. (A large radius causes the API to select static imagery over non-static imagery).      |
| **Source**  | `Outdoor` | `All` uses the default sources for Street View; searches are not limited to specific sources. `Outdoor` limits searches to outdoor collections. Indoor collections are not included in search results.                                              |

## Roadmap

- [x] ~~French version~~

## Feature Requests

Have an idea or suggestion? Open an issue with the `feature request` label.

## FAQ

<details>
  <summary>What if I have two map widgets in my experience?</summary>
  Add this widget twice, one for each map.
</details>

## Project Structure

```
src/street-view/
├── icon.svg              # Widget icon for EXB menu
├── manifest.json         # Widget metadata
├── config.ts             # Configuration types
└── src/
    ├── setting/          # Settings panel UI
    └── runtime/
        ├── widget.tsx    # Main widget component
        ├── views/        # UI components
        ├── services/     # Map and Street View logic
        ├── hooks/        # React hooks
        ├── types/        # TypeScript types
        ├── translations/ # i18n strings
        ├── utils/        # Helper functions
        └── css/          # Styles
```

## License

[Apache-2.0 license](./LICENSE)
