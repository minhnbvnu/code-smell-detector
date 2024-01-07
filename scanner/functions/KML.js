constructor(options) {
    super();

    options = options ? options : {};

    if (!DEFAULT_STYLE_ARRAY) {
      createStyleDefaults();
    }

    /**
     * @type {import("../proj/Projection.js").default}
     */
    this.dataProjection = getProjection('EPSG:4326');

    /**
     * @private
     * @type {Array<Style>}
     */
    this.defaultStyle_ = options.defaultStyle
      ? options.defaultStyle
      : DEFAULT_STYLE_ARRAY;

    /**
     * @private
     * @type {boolean}
     */
    this.extractStyles_ =
      options.extractStyles !== undefined ? options.extractStyles : true;

    /**
     * @type {boolean}
     */
    this.writeStyles_ =
      options.writeStyles !== undefined ? options.writeStyles : true;

    /**
     * @private
     * @type {!Object<string, (Array<Style>|string)>}
     */
    this.sharedStyles_ = {};

    /**
     * @private
     * @type {boolean}
     */
    this.showPointNames_ =
      options.showPointNames !== undefined ? options.showPointNames : true;

    /**
     * @type {null|string}
     */
    this.crossOrigin_ =
      options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';

    /**
     * @type {IconUrlFunction}
     */
    this.iconUrlFunction_ = options.iconUrlFunction
      ? options.iconUrlFunction
      : defaultIconUrlFunction;

    this.supportedMediaTypes = ['application/vnd.google-earth.kml+xml'];
  }