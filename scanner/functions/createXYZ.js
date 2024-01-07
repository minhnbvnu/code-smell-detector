function createXYZ(options) {
  const xyzOptions = options || {};

  const extent = xyzOptions.extent || getProjection('EPSG:3857').getExtent();

  const gridOptions = {
    extent: extent,
    minZoom: xyzOptions.minZoom,
    tileSize: xyzOptions.tileSize,
    resolutions: resolutionsFromExtent(
      extent,
      xyzOptions.maxZoom,
      xyzOptions.tileSize,
      xyzOptions.maxResolution,
    ),
  };
  return new TileGrid(gridOptions);
}