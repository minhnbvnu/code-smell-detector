function getLegendUrl(options, resolution) {
  if (options.url === undefined) {
    return undefined;
  }

  const baseParams = {
    'SERVICE': 'WMS',
    'VERSION': DEFAULT_VERSION,
    'REQUEST': 'GetLegendGraphic',
    'FORMAT': 'image/png',
  };

  if (options.params === undefined || options.params['LAYER'] === undefined) {
    const layers = options.params.LAYERS;
    const isSingleLayer = !Array.isArray(layers) || layers.length === 1;
    if (!isSingleLayer) {
      return undefined;
    }
    baseParams['LAYER'] = layers;
  }

  if (resolution !== undefined) {
    const mpu =
      getProjection(options.projection || 'EPSG:3857').getMetersPerUnit() || 1;
    const pixelSize = 0.00028;
    baseParams['SCALE'] = (resolution * mpu) / pixelSize;
  }

  Object.assign(baseParams, options.params);

  return appendParams(options.url, baseParams);
}