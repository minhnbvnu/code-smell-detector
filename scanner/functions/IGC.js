constructor(options) {
    super();

    options = options ? options : {};

    /**
     * @type {import("../proj/Projection.js").default}
     */
    this.dataProjection = getProjection('EPSG:4326');

    /**
     * @private
     * @type {IGCZ}
     */
    this.altitudeMode_ = options.altitudeMode ? options.altitudeMode : 'none';
  }