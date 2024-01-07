constructor(extent, resolution, pixelRatio, canvas, loader) {
    const state = loader !== undefined ? ImageState.IDLE : ImageState.LOADED;

    super(extent, resolution, pixelRatio, state);

    /**
     * Optional canvas loader function.
     * @type {?Loader}
     * @private
     */
    this.loader_ = loader !== undefined ? loader : null;

    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    this.canvas_ = canvas;

    /**
     * @private
     * @type {?Error}
     */
    this.error_ = null;
  }