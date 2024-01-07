constructor(type, feature, features) {
    super(type);

    /**
     * The added or removed feature for the `ADDFEATURE` and `REMOVEFEATURE` events, `undefined` otherwise.
     * @type {FeatureClass|undefined}
     * @api
     */
    this.feature = feature;

    /**
     * The loaded features for the `FEATURESLOADED` event, `undefined` otherwise.
     * @type {Array<FeatureClass>|undefined}
     * @api
     */
    this.features = features;
  }