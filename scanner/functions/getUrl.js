function getUrl(
  baseUrl,
  params,
  extent,
  size,
  useOverlay,
  metersPerUnit,
  displayDpi,
) {
  const scale = getScale(extent, size, metersPerUnit, displayDpi);
  const center = getCenter(extent);
  const baseParams = {
    'OPERATION': useOverlay ? 'GETDYNAMICMAPOVERLAYIMAGE' : 'GETMAPIMAGE',
    'VERSION': '2.0.0',
    'LOCALE': 'en',
    'CLIENTAGENT': 'ol/source/ImageMapGuide source',
    'CLIP': '1',
    'SETDISPLAYDPI': displayDpi,
    'SETDISPLAYWIDTH': Math.round(size[0]),
    'SETDISPLAYHEIGHT': Math.round(size[1]),
    'SETVIEWSCALE': scale,
    'SETVIEWCENTERX': center[0],
    'SETVIEWCENTERY': center[1],
  };
  Object.assign(baseParams, params);
  return appendParams(baseUrl, baseParams);
}