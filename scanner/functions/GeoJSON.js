constructor(options) {
    options = options ? options : {};

    super();

    /**
     * @type {import("../proj/Projection.js").default}
     */
    this.dataProjection = getProjection(
      options.dataProjection ? options.dataProjection : 'EPSG:4326',
    );

    if (options.featureProjection) {
      /**
       * @type {import("../proj/Projection.js").default}
       */
      this.defaultFeatureProjection = getProjection(options.featureProjection);
    }

    if (options.featureClass) {
      this.featureClass = options.featureClass;
    }

    /**
     * Name of the geometry attribute for features.
     * @type {string|undefined}
     * @private
     */
    this.geometryName_ = options.geometryName;

    /**
     * Look for the `geometry_name` in the feature GeoJSON
     * @type {boolean|undefined}
     * @private
     */
    this.extractGeometryName_ = options.extractGeometryName;

    this.supportedMediaTypes = [
      'application/geo+json',
      'application/vnd.geo+json',
    ];
  }