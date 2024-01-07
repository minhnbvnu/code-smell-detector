constructor(options) {
    options = options ? options : {};

    super();

    /**
     * Name of the geometry attribute for features.
     * @type {string|undefined}
     * @private
     */
    this.geometryName_ = options.geometryName;
  }