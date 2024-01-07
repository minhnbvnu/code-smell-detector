constructor(type, options) {
    super(type);
    /**
     * The Map coordinate of the snapped point.
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */
    this.vertex = options.vertex;
    /**
     * The Map pixel of the snapped point.
     * @type {Array<number>&Array<number>}
     * @api
     */
    this.vertexPixel = options.vertexPixel;
    /**
     * The feature closest to the snapped point.
     * @type {import("../Feature.js").default<import("../geom/Geometry.js").default>}
     * @api
     */
    this.feature = options.feature;
    /**
     * The segment closest to the snapped point, if snapped to a segment.
     * @type {Array<import("../coordinate.js").Coordinate>|null}
     * @api
     */
    this.segment = options.segment;
  }