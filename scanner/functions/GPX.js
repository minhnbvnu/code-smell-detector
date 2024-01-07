constructor(options) {
    super();

    options = options ? options : {};

    /**
     * @type {import("../proj/Projection.js").default}
     */
    this.dataProjection = getProjection('EPSG:4326');

    /**
     * @type {function(Feature, Node): void|undefined}
     * @private
     */
    this.readExtensions_ = options.readExtensions;
  }