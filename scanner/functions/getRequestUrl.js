function getRequestUrl(baseUrl, extent, size, projection, params) {
  params['WIDTH'] = size[0];
  params['HEIGHT'] = size[1];

  const axisOrientation = projection.getAxisOrientation();
  let bbox;
  const v13 = compareVersions(params['VERSION'], '1.3') >= 0;
  params[v13 ? 'CRS' : 'SRS'] = projection.getCode();
  if (v13 && axisOrientation.substr(0, 2) == 'ne') {
    bbox = [extent[1], extent[0], extent[3], extent[2]];
  } else {
    bbox = extent;
  }
  params['BBOX'] = bbox.join(',');

  return appendParams(/** @type {string} */ (baseUrl), params);
}