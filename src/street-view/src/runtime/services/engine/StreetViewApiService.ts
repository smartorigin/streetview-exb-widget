import type { StreetViewApiParams } from '../../../config'

class StreetViewApiService {
  private googleApiKey?: string

  private params?: StreetViewApiParams

  private readonly baseUrl = 'https://www.google.com/maps/embed/v1/streetview'

  constructor(googleApiKey?: string, apiParams?: StreetViewApiParams) {
    this.googleApiKey = googleApiKey
    this.params = apiParams
  }

  public setApiParams(params: StreetViewApiParams) {
    this.params = params
  }

  public setApiKey(googleApiKey?: string) {
    this.googleApiKey = googleApiKey
  }

  public hasApiKey() {
    return Boolean(this.googleApiKey)
  }

  public buildUrl(latitude: number | null, longitude: number | null) {
    if (!this.googleApiKey || latitude == null || longitude == null) {
      return
    }

    return `${this.baseUrl}?key=${this.googleApiKey}&location=${String(latitude)},${String(longitude)}&heading=${this.params.heading}&pitch=${this.params.pitch}&fov=${this.params.fov}&radius=${this.params.radius}&source=${this.params.source}`
  }

  public buildWebUrl(latitude: number | null, longitude: number | null) {
    if (latitude == null || longitude == null) {
      return
    }

    return `https://www.google.com/maps/@${String(latitude)},${String(longitude)},0a,${this.params.fov}y,${this.params.heading}h/data=!3m4!1e1!3m2!1s0x0:0x0!2e0`
  }

  /**
   * Check if street view images are available at a specified location
   */
  public async checkStreetViewAvailability(latitude: number | null, longitude: number | null): Promise<boolean> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/streetview/metadata?key=${this.googleApiKey}&location=${String(latitude)},${String(longitude)}&radius=${this.params.radius}`,
        {
          method: 'GET'
        }
      )

      if (!response.ok) {
        console.error('[StreetViewApiService: checkStreetViewAvailability()] fetch request failed. \n', response)
        throw new Error('[StreetViewApiService: checkStreetViewAvailability()] fetch request failed.')
      }

      const res = await response.json()

      if (res.status === 'ZERO_RESULTS') {
        return false
      }
      return true
    } catch (err) {
      console.error('[StreetViewApiService: checkStreetViewAvailability()] fetch request failed. \n', err)
    }
  }
}

export default StreetViewApiService
