constructor(options) {
    options = options ? options : {};

    super(options);

    this.FEATURE_COLLECTION_PARSERS[GMLNS]['featureMember'] = makeArrayPusher(
      this.readFeaturesInternal,
    );

    /**
     * @type {string}
     */
    this.schemaLocation = options.schemaLocation
      ? options.schemaLocation
      : schemaLocation;
  }