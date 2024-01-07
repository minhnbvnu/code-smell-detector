constructor(options) {
    options = options || {};

    /**
     * @private
     * @type {string|import("../geom/Geometry.js").default|GeometryFunction|null}
     */
    this.geometry_ = null;

    /**
     * @private
     * @type {!GeometryFunction}
     */
    this.geometryFunction_ = defaultGeometryFunction;

    if (options.geometry !== undefined) {
      this.setGeometry(options.geometry);
    }

    /**
     * @private
     * @type {import("./Fill.js").default|null}
     */
    this.fill_ = options.fill !== undefined ? options.fill : null;

    /**
     * @private
     * @type {import("./Image.js").default|null}
     */
    this.image_ = options.image !== undefined ? options.image : null;

    /**
     * @private
     * @type {RenderFunction|null}
     */
    this.renderer_ = options.renderer !== undefined ? options.renderer : null;

    /**
     * @private
     * @type {RenderFunction|null}
     */
    this.hitDetectionRenderer_ =
      options.hitDetectionRenderer !== undefined
        ? options.hitDetectionRenderer
        : null;

    /**
     * @private
     * @type {import("./Stroke.js").default|null}
     */
    this.stroke_ = options.stroke !== undefined ? options.stroke : null;

    /**
     * @private
     * @type {import("./Text.js").default|null}
     */
    this.text_ = options.text !== undefined ? options.text : null;

    /**
     * @private
     * @type {number|undefined}
     */
    this.zIndex_ = options.zIndex;
  }