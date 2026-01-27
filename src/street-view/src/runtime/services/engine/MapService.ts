// @ts-nocheck on newer exb versions this import path trigger ts error
import reactiveUtils from 'esri/core/reactiveUtils'
import Graphic from 'esri/Graphic'
import Point from 'esri/geometry/Point'
import type CIMSymbol from 'esri/symbols/CIMSymbol'
import type { JimuMapView } from 'jimu-arcgis'

class MapService {
  POPUP_STREETVIEW_ACTION_ID: string = 'open-in-streetview-action'
  jmv: JimuMapView

  constructor(jmv: JimuMapView) {
    this.jmv = jmv
  }

  /**
   * Execute callback on map click
   */
  onClick(callback: (e: __esri.ViewClickEvent) => void, options?: { skipOnFeatureHit?: boolean }) {
    return this.jmv.view.on('click', async (e) => {
      if (options?.skipOnFeatureHit) {
        const hitTestResult = await this.jmv.view.hitTest(e)
        const hasFeature = hitTestResult.results.some((result) => result.layer?.type === 'feature')
        if (hasFeature) return
      }
      callback(e)
    })
  }

  /**
   * Execute callback on popup action trigger
   */
  onPopupAction(callback: (geometry: __esri.Geometry) => void) {
    const handle = reactiveUtils.on(
      () => this.jmv.view.popup,
      'trigger-action',
      (event) => {
        if (event.action.id === this.POPUP_STREETVIEW_ACTION_ID) {
          const geometry = this.jmv.view.popup.selectedFeature.geometry
          callback(geometry)
        }
      }
    )
    return handle
  }

  /**
   * Return a map point given a x y coordinates
   */
  getPoint(x: number, y: number): Point | null {
    return this.jmv.view.toMap({ x: x, y: y })
  }

  /**
   * Add a graphic point to the map
   */
  addGraphicPoint(latitude: number, longitude: number, symbol: CIMSymbol, type: string) {
    const point = new Point({
      longitude: longitude,
      latitude: latitude
    })

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: symbol,
      attributes: {
        type: type
      }
    })

    this.jmv.view.graphics.add(pointGraphic)
    return pointGraphic
  }

  /**
   * Remove a graphic point from the map
   */
  public removeGraphicPoint(graphicPoint: __esri.Graphic) {
    this.jmv.view.graphics.remove(graphicPoint)
  }

  public removeAllStreetViewGraphicPoints() {
    const streetViewGraphicPoints = this.jmv.view.graphics.map((graphic) => {
      if (graphic.attributes.type === 'street-view-graphic') {
        return graphic
      }
    })
    this.jmv.view.graphics.removeMany(streetViewGraphicPoints)
  }

  /**
   * Setup custom popup actions on feature layers
   */
  public async setPopupActions() {
    // Wait for layers to be loaded
    await this.jmv.whenAllJimuLayerViewLoaded()

    for (const layerViewId in this.jmv.jimuLayerViews) {
      const layerView = this.jmv.jimuLayerViews[layerViewId]
      if (layerView.layer && layerView.layer.popupTemplate) {
        layerView.layer.popupTemplate.actions ||= []
        if (layerView.layer.popupTemplate.actions.find((f) => f.id === this.POPUP_STREETVIEW_ACTION_ID) === undefined) {
          layerView.layer.popupTemplate.actions.push({
            id: this.POPUP_STREETVIEW_ACTION_ID,
            icon: '360-view',
            title: 'Open in Street View',
            //not standard
            layerUrl: layerView.layer.parsedUrl ? layerView.layer.parsedUrl.path : layerView.layer.url
          })
        }
      }
    }

    /**
     * On the custom action being triggered
     */
    reactiveUtils.on(
      () => this.jmv.view.popup,
      'trigger-action',
      (event) => {
        console.log(this.jmv.view.popup.selectedFeature.geometry.toJSON())
        if (event.action.id === this.POPUP_STREETVIEW_ACTION_ID) {
          console.log(this.jmv.view.popup)

          console.log(event)
        }
      }
    )
  }
}

export default MapService
