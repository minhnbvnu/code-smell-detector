function getImageSrc(
  extent,
  resolution,
  pixelRatio,
  projection,
  url,
  params,
  serverType,
) {
  params = Object.assign({REQUEST: 'GetMap'}, params);

  const imageResolution = resolution / pixelRatio;

  const imageSize = [
    round(getWidth(extent) / imageResolution, DECIMALS),
    round(getHeight(extent) / imageResolution, DECIMALS),
  ];

  if (pixelRatio != 1) {
    switch (serverType) {
      case 'geoserver':
        const dpi = (90 * pixelRatio + 0.5) | 0;
        if ('FORMAT_OPTIONS' in params) {
          params['FORMAT_OPTIONS'] += ';dpi:' + dpi;
        } else {
          params['FORMAT_OPTIONS'] = 'dpi:' + dpi;
        }
        break;
      case 'mapserver':
        params['MAP_RESOLUTION'] = 90 * pixelRatio;
        break;
      case 'carmentaserver':
      case 'qgis':
        params['DPI'] = 90 * pixelRatio;
        break;
      default:
        throw new Error('Unknown `serverType` configured');
    }
  }

  const src = getRequestUrl(url, extent, imageSize, projection, params);
  return src;
}