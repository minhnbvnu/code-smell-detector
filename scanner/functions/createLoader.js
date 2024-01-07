function createLoader(options) {
  const hidpi = options.hidpi === undefined ? true : options.hidpi;
  const projection = getProjection(options.projection || 'EPSG:3857');
  const ratio = options.ratio || 1.5;
  const load = options.load || decode;

  /**
   * @type {import("../Image.js").Loader}
   */
  return (extent, resolution, pixelRatio) => {
    extent = getRequestExtent(extent, resolution, pixelRatio, ratio);
    if (pixelRatio != 1 && (!hidpi || options.serverType === undefined)) {
      pixelRatio = 1;
    }
    const src = getImageSrc(
      extent,
      resolution,
      pixelRatio,
      projection,
      options.url,
      getRequestParams(options.params, 'GetMap'),
      options.serverType,
    );
    const image = new Image();
    if (options.crossOrigin !== null) {
      image.crossOrigin = options.crossOrigin;
    }
    return load(image, src).then((image) => ({image, extent, pixelRatio}));
  };
}