constructor(options) {
    options = options ? options : {};

    super({
      attributions: options.attributions,
      interpolate: options.interpolate,
      projection: options.projection,
      resolutions: options.resolutions,
      state: options.state,
    });

    /**
     * @private
     * @type {FunctionType}
     */
    this.canvasFunction_ = options.canvasFunction;

    /**
     * @private
     * @type {import("../ImageCanvas.js").default}
     */
    this.canvas_ = null;

    /**
     * @private
     * @type {number}
     */
    this.renderedRevision_ = 0;

    /**
     * @private
     * @type {number}
     */
    this.ratio_ = options.ratio !== undefined ? options.ratio : 1.5;
  }