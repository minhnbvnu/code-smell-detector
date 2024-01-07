constructor(options) {
    super({
      attributions: options.attributions,
      projection: options.projection,
      state: options.state,
      interpolate:
        options.interpolate !== undefined ? options.interpolate : true,
    });

    /***
     * @type {ImageSourceOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {ImageSourceOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {ImageSourceOnSignature<void>}
     */
    this.un;

    /**
     * @protected
     * @type {import("../Image.js").Loader}
     */
    this.loader = options.loader || null;

    /**
     * @private
     * @type {Array<number>|null}
     */
    this.resolutions_ =
      options.resolutions !== undefined ? options.resolutions : null;

    /**
     * @private
     * @type {import("../reproj/Image.js").default}
     */
    this.reprojectedImage_ = null;

    /**
     * @private
     * @type {number}
     */
    this.reprojectedRevision_ = 0;

    /**
     * @protected
     * @type {import("../Image.js").default}
     */
    this.image = null;

    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    this.wantedExtent_;

    /**
     * @private
     * @type {number}
     */
    this.wantedResolution_;

    /**
     * @private
     * @type {boolean}
     */
    this.static_ = options.loader ? options.loader.length === 0 : false;

    /**
     * @private
     * @type {import("../proj/Projection.js").default}
     */
    this.wantedProjection_ = null;
  }