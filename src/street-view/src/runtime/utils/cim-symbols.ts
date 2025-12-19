import CIMSymbol from '@arcgis/core/symbols/CIMSymbol';

/**
 * Store cim symbols to use in graphics
 */

const primaryColorRGBA = [0, 84, 165, 255];

export const personViewSymbol = new CIMSymbol({
  data: {
    type: 'CIMSymbolReference',
    symbol: {
      type: 'CIMPointSymbol',
      symbolLayers: [
        {
          type: 'CIMVectorMarker',
          enable: true,
          anchorPointUnits: 'Relative',
          size: 25,
          frame: {
            xmin: 0,
            ymin: 0,
            xmax: 24,
            ymax: 24
          },
          markerGraphics: [
            {
              type: 'CIMMarkerGraphic',
              geometry: {
                rings: [
                  [
                    [12, 18],
                    [12.35, 18.03],
                    [12.68, 18.12],
                    [13, 18.27],
                    [13.29, 18.47],
                    [13.53, 18.71],
                    [13.73, 19],
                    [13.88, 19.32],
                    [13.97, 19.65],
                    [14, 20],
                    [13.97, 20.35],
                    [13.88, 20.68],
                    [13.73, 21],
                    [13.53, 21.29],
                    [13.29, 21.53],
                    [13, 21.73],
                    [12.68, 21.88],
                    [12.35, 21.97],
                    [12, 22],
                    [11.65, 21.97],
                    [11.32, 21.88],
                    [11, 21.73],
                    [10.71, 21.53],
                    [10.47, 21.29],
                    [10.27, 21],
                    [10.12, 20.68],
                    [10.03, 20.35],
                    [10, 20],
                    [10.03, 19.65],
                    [10.12, 19.32],
                    [10.27, 19],
                    [10.47, 18.71],
                    [10.71, 18.47],
                    [11, 18.27],
                    [11.32, 18.12],
                    [11.65, 18.03],
                    [12, 18]
                  ]
                ]
              },
              symbol: {
                type: 'CIMPolygonSymbol',
                symbolLayers: [
                  {
                    type: 'CIMSolidFill',
                    enable: true,
                    color: primaryColorRGBA
                  }
                ]
              }
            },
            {
              type: 'CIMMarkerGraphic',
              geometry: {
                rings: [
                  [
                    [12, 6],
                    [14, 6],
                    [14, 11],
                    [16, 11],
                    [16, 15],
                    [15.96, 15.39],
                    [15.85, 15.76],
                    [15.66, 16.11],
                    [15.41, 16.41],
                    [15.11, 16.66],
                    [14.76, 16.85],
                    [14.39, 16.96],
                    [14, 17],
                    [10, 17],
                    [9.61, 16.96],
                    [9.24, 16.85],
                    [8.89, 16.66],
                    [8.59, 16.41],
                    [8.34, 16.11],
                    [8.15, 15.76],
                    [8.04, 15.39],
                    [8, 15],
                    [8, 11],
                    [10, 11],
                    [10, 6],
                    [12, 6]
                  ]
                ]
              },
              symbol: {
                type: 'CIMPolygonSymbol',
                symbolLayers: [
                  {
                    type: 'CIMSolidFill',
                    enable: true,
                    color: primaryColorRGBA
                  }
                ]
              }
            },
            {
              type: 'CIMMarkerGraphic',
              geometry: {
                rings: [
                  [
                    [12, 2],
                    [13.98, 2.11],
                    [15.86, 2.45],
                    [17.59, 3],
                    [19.1, 3.74],
                    [20.34, 4.64],
                    [21.25, 5.68],
                    [21.81, 6.81],
                    [22, 8],
                    [21.77, 9.32],
                    [21.07, 10.56],
                    [19.95, 11.68],
                    [18.45, 12.61],
                    [18.45, 12.61],
                    [17.55, 10.83],
                    [18.59, 10.2],
                    [19.36, 9.5],
                    [19.84, 8.76],
                    [20, 8],
                    [19.83, 7.25],
                    [19.35, 6.5],
                    [18.56, 5.79],
                    [17.53, 5.17],
                    [16.32, 4.67],
                    [14.97, 4.3],
                    [13.52, 4.08],
                    [12, 4],
                    [10.48, 4.08],
                    [9.03, 4.3],
                    [7.68, 4.67],
                    [6.47, 5.17],
                    [5.44, 5.79],
                    [4.65, 6.5],
                    [4.17, 7.25],
                    [4, 8],
                    [4.16, 8.76],
                    [4.64, 9.5],
                    [5.41, 10.2],
                    [6.45, 10.83],
                    [5.55, 12.61],
                    [4.05, 11.68],
                    [2.93, 10.56],
                    [2.23, 9.32],
                    [2, 8],
                    [2.19, 6.81],
                    [2.75, 5.68],
                    [3.66, 4.64],
                    [4.9, 3.74],
                    [6.41, 3],
                    [8.14, 2.45],
                    [10.02, 2.11],
                    [12, 2]
                  ]
                ]
              },
              symbol: {
                type: 'CIMPolygonSymbol',
                symbolLayers: [
                  {
                    type: 'CIMSolidFill',
                    enable: true,
                    color: primaryColorRGBA
                  }
                ]
              }
            }
          ],
          scaleSymbolsProportionally: true,
          respectFrame: true
        }
      ],
      animations: []
    }
  }
});
