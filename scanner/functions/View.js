constructor(options) {
    super();

    /***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */
    this.on;

    /***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */
    this.once;

    /***
     * @type {ViewOnSignature<void>}
     */
    this.un;

    options = Object.assign({}, options);

    /**
     * @private
     * @type {Array<number>}
     */
    this.hints_ = [0, 0];

    /**
     * @private
     * @type {Array<Array<Animation>>}
     */
    this.animations_ = [];

    /**
     * @private
     * @type {number|undefined}
     */
    this.updateAnimationKey_;

    /**
     * @private
     * @const
     * @type {import("./proj/Projection.js").default}
     */
    this.projection_ = createProjection(options.projection, 'EPSG:3857');

    /**
     * @private
     * @type {import("./size.js").Size}
     */
    this.viewportSize_ = [100, 100];

    /**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */
    this.targetCenter_ = null;

    /**
     * @private
     * @type {number|undefined}
     */
    this.targetResolution_;

    /**
     * @private
     * @type {number|undefined}
     */
    this.targetRotation_;

    /**
     * @private
     * @type {import("./coordinate.js").Coordinate}
     */
    this.nextCenter_ = null;

    /**
     * @private
     * @type {number}
     */
    this.nextResolution_;

    /**
     * @private
     * @type {number}
     */
    this.nextRotation_;

    /**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */
    this.cancelAnchor_ = undefined;

    if (options.projection) {
      disableCoordinateWarning();
    }
    if (options.center) {
      options.center = fromUserCoordinate(options.center, this.projection_);
    }
    if (options.extent) {
      options.extent = fromUserExtent(options.extent, this.projection_);
    }

    this.applyOptions_(options);
  }