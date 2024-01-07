constructor(options) {
    super();

    options = options ? options : {};

    /**
     * @protected
     * @type {Array<string>|string|undefined}
     */
    this.featureType = options.featureType;

    /**
     * @protected
     * @type {Object<string, string>|string|undefined}
     */
    this.featureNS = options.featureNS;

    /**
     * @protected
     * @type {string|undefined}
     */
    this.srsName = options.srsName;

    /**
     * @protected
     * @type {string}
     */
    this.schemaLocation = '';

    /**
     * @type {Object<string, Object<string, Object>>}
     */
    this.FEATURE_COLLECTION_PARSERS = {};
    this.FEATURE_COLLECTION_PARSERS[this.namespace] = {
      'featureMember': makeArrayPusher(this.readFeaturesInternal),
      'featureMembers': makeReplacer(this.readFeaturesInternal),
    };

    this.supportedMediaTypes = ['application/gml+xml'];
  }