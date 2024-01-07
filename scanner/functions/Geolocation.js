constructor(options) {
    super();

    /***
     * @type {GeolocationOnSignature<import("./events").EventsKey>}
     */
    this.on;

    /***
     * @type {GeolocationOnSignature<import("./events").EventsKey>}
     */
    this.once;

    /***
     * @type {GeolocationOnSignature<void>}
     */
    this.un;

    options = options || {};

    /**
     * The unprojected (EPSG:4326) device position.
     * @private
     * @type {?import("./coordinate.js").Coordinate}
     */
    this.position_ = null;

    /**
     * @private
     * @type {import("./proj.js").TransformFunction}
     */
    this.transform_ = identityTransform;

    /**
     * @private
     * @type {number|undefined}
     */
    this.watchId_ = undefined;

    this.addChangeListener(Property.PROJECTION, this.handleProjectionChanged_);
    this.addChangeListener(Property.TRACKING, this.handleTrackingChanged_);

    if (options.projection !== undefined) {
      this.setProjection(options.projection);
    }
    if (options.trackingOptions !== undefined) {
      this.setTrackingOptions(options.trackingOptions);
    }

    this.setTracking(options.tracking !== undefined ? options.tracking : false);
  }