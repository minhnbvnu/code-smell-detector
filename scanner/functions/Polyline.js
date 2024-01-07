constructor(options) {
    super();

    options = options ? options : {};

    /**
     * @type {import("../proj/Projection.js").default}
     */
    this.dataProjection = getProjection('EPSG:4326');

    /**
     * @private
     * @type {number}
     */
    this.factor_ = options.factor ? options.factor : 1e5;

    /**
     * @private
     * @type {import("../geom/Geometry.js").GeometryLayout}
     */
    this.geometryLayout_ = options.geometryLayout
      ? options.geometryLayout
      : 'XY';
  }