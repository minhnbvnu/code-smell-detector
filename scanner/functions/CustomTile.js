constructor(
    tileSize,
    tileCoord,
    state,
    src,
    crossOrigin,
    tileLoadFunction,
    options,
  ) {
    super(tileCoord, state, src, crossOrigin, tileLoadFunction, options);

    /**
     * @private
     * @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement}
     */
    this.zoomifyImage_ = null;

    /**
     * @type {import("../size.js").Size}
     */
    this.tileSize_ = tileSize;
  }