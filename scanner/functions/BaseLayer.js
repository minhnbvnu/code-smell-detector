constructor(options) {
    super();

    /***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {BaseLayerOnSignature<void>}
     */
    this.un;

    /**
     * @type {BackgroundColor|false}
     * @private
     */
    this.background_ = options.background;

    /**
     * @type {Object<string, *>}
     */
    const properties = Object.assign({}, options);
    if (typeof options.properties === 'object') {
      delete properties.properties;
      Object.assign(properties, options.properties);
    }

    properties[LayerProperty.OPACITY] =
      options.opacity !== undefined ? options.opacity : 1;
    assert(
      typeof properties[LayerProperty.OPACITY] === 'number',
      'Layer opacity must be a number',
    );

    properties[LayerProperty.VISIBLE] =
      options.visible !== undefined ? options.visible : true;
    properties[LayerProperty.Z_INDEX] = options.zIndex;
    properties[LayerProperty.MAX_RESOLUTION] =
      options.maxResolution !== undefined ? options.maxResolution : Infinity;
    properties[LayerProperty.MIN_RESOLUTION] =
      options.minResolution !== undefined ? options.minResolution : 0;
    properties[LayerProperty.MIN_ZOOM] =
      options.minZoom !== undefined ? options.minZoom : -Infinity;
    properties[LayerProperty.MAX_ZOOM] =
      options.maxZoom !== undefined ? options.maxZoom : Infinity;

    /**
     * @type {string}
     * @private
     */
    this.className_ =
      properties.className !== undefined ? properties.className : 'ol-layer';
    delete properties.className;

    this.setProperties(properties);

    /**
     * @type {import("./Layer.js").State}
     * @private
     */
    this.state_ = null;
  }