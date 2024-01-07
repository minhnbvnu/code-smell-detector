constructor(options) {
    options = options ? options : {};

    const baseOptions = /** @type {Object} */ (Object.assign({}, options));
    delete baseOptions.preload;
    delete baseOptions.useInterimTilesOnError;

    super(
      /** @type {import("./BaseVector.js").Options<import("../source/VectorTile.js").default>} */ (
        baseOptions
      ),
    );

    /***
     * @type {VectorTileLayerOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {VectorTileLayerOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {VectorTileLayerOnSignature<void>}
     */
    this.un;

    const renderMode = options.renderMode || 'hybrid';
    assert(
      renderMode == 'hybrid' || renderMode == 'vector',
      "`renderMode` must be `'hybrid'` or `'vector'`",
    );

    /**
     * @private
     * @type {VectorTileRenderType}
     */
    this.renderMode_ = renderMode;

    this.setPreload(options.preload ? options.preload : 0);
    this.setUseInterimTilesOnError(
      options.useInterimTilesOnError !== undefined
        ? options.useInterimTilesOnError
        : true,
    );

    /**
     * @return {import("./Base.js").BackgroundColor} Background color.
     * @function
     * @api
     */
    this.getBackground;

    /**
     * @param {import("./Base.js").BackgroundColor} background Background color.
     * @function
     * @api
     */
    this.setBackground;
  }