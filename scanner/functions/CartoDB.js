constructor(options) {
    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      maxZoom: options.maxZoom !== undefined ? options.maxZoom : 18,
      minZoom: options.minZoom,
      projection: options.projection,
      transition: options.transition,
      wrapX: options.wrapX,
      zDirection: options.zDirection,
    });

    /**
     * @type {string}
     * @private
     */
    this.account_ = options.account;

    /**
     * @type {string}
     * @private
     */
    this.mapId_ = options.map || '';

    /**
     * @type {!Object}
     * @private
     */
    this.config_ = options.config || {};

    /**
     * @type {!Object<string, CartoDBLayerInfo>}
     * @private
     */
    this.templateCache_ = {};

    this.initializeMap_();
  }