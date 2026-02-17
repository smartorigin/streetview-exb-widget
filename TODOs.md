# TODOs

## General

- [x] Add error/feedback screen when Google API key isn't set and map is clicked
- [x] Add error/feedback when point click doesn't have street view imagery
- [x] Fix transparency issue on floating view
- [x] Create translations files for runtime
- [x] Add "Open in Street View" actions to native EXB point actions
- [x] Use native theme variable instead of custom one
- [x] Make street view embeded api params controllable through settings
- [x] Add a guaranted loading view between every map click
- [x] Allow to control default behaviour through settings (click to view/popup action)
- [x] Add a reset button to Street View API section of settings
- [ ] Add a loading spinner on map at clicked point, change it back to a position marker when loading has finished
- [ ] Improve performance
- [ ] Add floating error/warning state when map isnt selected
- [ ] Switch view when detecting mobile/desktop
- [x] Make it compatible with exb versions >= 1.11

## Refactoring

- [x] Make settings.tsx more readable by creating components for each row

## Tests

- [ ] Write some unit tests
- [ ] Write some integrations tests
- [ ] Test compatibility with v1.12,13,14,15

## Readme

- [x] Add "pré requis" section to readme
- [x] Add "feature request" section to readme
- [x] Update readme gif to use latest ver of the widget
- [x] Add french version
- [ ] Compress the gif files

## Bugs

- [x] When spam clicking multiple graphic marker can appear on the map, expected behaviour is only one graphic marker at a time
