constructor(options) {
    super();

    options = options ? options : {};

    /**
     * @private
     * @type {string}
     */
    this.version_ = options.version ? options.version : DEFAULT_VERSION;

    /**
     * @private
     * @type {Array<string>|string|undefined}
     */
    this.featureType_ = options.featureType;

    /**
     * @private
     * @type {Object<string, string>|string|undefined}
     */
    this.featureNS_ = options.featureNS;

    /**
     * @private
     * @type {GMLBase}
     */
    this.gmlFormat_ = options.gmlFormat
      ? options.gmlFormat
      : new GML_FORMATS[this.version_]();

    /**
     * @private
     * @type {string}
     */
    this.schemaLocation_ = options.schemaLocation
      ? options.schemaLocation
      : SCHEMA_LOCATIONS[this.version_];
  }