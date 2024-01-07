constructor(options) {
    super();

    options = options ? options : {};

    /**
     * @type {Projection}
     */
    this.dataProjection = new Projection({
      code: '',
      units: 'tile-pixels',
    });

    /**
     * @private
     * @type {import("../Feature.js").FeatureClass}
     */
    this.featureClass_ = options.featureClass
      ? options.featureClass
      : RenderFeature;

    /**
     * @private
     * @type {string|undefined}
     */
    this.geometryName_ = options.geometryName;

    /**
     * @private
     * @type {string}
     */
    this.layerName_ = options.layerName ? options.layerName : 'layer';

    /**
     * @private
     * @type {Array<string>|null}
     */
    this.layers_ = options.layers ? options.layers : null;

    /**
     * @private
     * @type {string}
     */
    this.idProperty_ = options.idProperty;

    this.supportedMediaTypes = [
      'application/vnd.mapbox-vector-tile',
      'application/x-protobuf',
    ];
  }