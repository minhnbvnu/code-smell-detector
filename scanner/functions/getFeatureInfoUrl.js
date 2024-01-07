function getFeatureInfoUrl(options, coordinate, resolution) {
  if (options.url === undefined) {
    return undefined;
  }

  const projectionObj = getProjection(options.projection || 'EPSG:3857');

  const extent = getForViewAndSize(
    coordinate,
    resolution,
    0,
    GETFEATUREINFO_IMAGE_SIZE,
  );

  const baseParams = {
    'QUERY_LAYERS': options.params['LAYERS'],
    'INFO_FORMAT': 'application/json',
  };
  Object.assign(
    baseParams,
    getRequestParams(options.params, 'GetFeatureInfo'),
    options.params,
  );

  const x = floor((coordinate[0] - extent[0]) / resolution, DECIMALS);
  const y = floor((extent[3] - coordinate[1]) / resolution, DECIMALS);
  const v13 = compareVersions(baseParams['VERSION'], '1.3') >= 0;
  baseParams[v13 ? 'I' : 'X'] = x;
  baseParams[v13 ? 'J' : 'Y'] = y;

  return getRequestUrl(
    options.url,
    extent,
    GETFEATUREINFO_IMAGE_SIZE,
    projectionObj,
    baseParams,
  );
}