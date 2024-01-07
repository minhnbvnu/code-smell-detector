constructor(options) {
    super();

    options = options ? options : {};

    /**
     * @private
     * @type {string|undefined}
     */
    this.layerName_ = options.layerName;

    /**
     * @private
     * @type {?Array<string>}
     */
    this.layers_ = options.layers ? options.layers : null;

    /**
     * @type {import("../proj/Projection.js").default}
     */
    this.dataProjection = getProjection(
      options.dataProjection ? options.dataProjection : 'EPSG:4326',
    );
  }