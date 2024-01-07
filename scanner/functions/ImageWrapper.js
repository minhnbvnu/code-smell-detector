constructor(extent, resolution, pixelRatio, stateOrLoader) {
    super();

    /**
     * @protected
     * @type {import("./extent.js").Extent}
     */
    this.extent = extent;

    /**
     * @private
     * @type {number}
     */
    this.pixelRatio_ = pixelRatio;

    /**
     * @protected
     * @type {number|Array<number>|undefined}
     */
    this.resolution = resolution;

    /**
     * @protected
     * @type {import("./ImageState.js").default}
     */
    this.state =
      typeof stateOrLoader === 'function' ? ImageState.IDLE : stateOrLoader;

    /**
     * @private
     * @type {import('./DataTile.js').ImageLike|null}
     */
    this.image_ = null;

    /**
     * @protected
     * @type {import("./Image.js").Loader}
     */
    this.loader = typeof stateOrLoader === 'function' ? stateOrLoader : null;
  }