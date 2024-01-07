constructor() {
    /**
     * @protected
     * @type {import("../proj/Projection.js").default|undefined}
     */
    this.dataProjection = undefined;

    /**
     * @protected
     * @type {import("../proj/Projection.js").default|undefined}
     */
    this.defaultFeatureProjection = undefined;

    /**
     * @protected
     * @type {import("../Feature.js").FeatureClass}
     */
    this.featureClass = Feature;

    /**
     * A list media types supported by the format in descending order of preference.
     * @type {Array<string>}
     */
    this.supportedMediaTypes = null;
  }