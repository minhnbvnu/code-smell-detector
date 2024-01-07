function resolutionsFromExtent(extent, maxZoom, tileSize, maxResolution) {
  maxZoom = maxZoom !== undefined ? maxZoom : DEFAULT_MAX_ZOOM;
  tileSize = toSize(tileSize !== undefined ? tileSize : DEFAULT_TILE_SIZE);

  const height = getHeight(extent);
  const width = getWidth(extent);

  maxResolution =
    maxResolution > 0
      ? maxResolution
      : Math.max(width / tileSize[0], height / tileSize[1]);

  const length = maxZoom + 1;
  const resolutions = new Array(length);
  for (let z = 0; z < length; ++z) {
    resolutions[z] = maxResolution / Math.pow(2, z);
  }
  return resolutions;
}