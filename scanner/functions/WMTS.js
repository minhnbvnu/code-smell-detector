constructor(options) {
    // TODO: add support for TileMatrixLimits

    const requestEncoding =
      options.requestEncoding !== undefined ? options.requestEncoding : 'KVP';

    // FIXME: should we create a default tileGrid?
    // we could issue a getCapabilities xhr to retrieve missing configuration
    const tileGrid = options.tileGrid;

    let urls = options.urls;
    if (urls === undefined && options.url !== undefined) {
      urls = expandUrl(options.url);
    }

    super({
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: options.interpolate,
      projection: options.projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileClass: options.tileClass,
      tileGrid: tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      urls: urls,
      wrapX: options.wrapX !== undefined ? options.wrapX : false,
      transition: options.transition,
      zDirection: options.zDirection,
    });

    /**
     * @private
     * @type {string}
     */
    this.version_ = options.version !== undefined ? options.version : '1.0.0';

    /**
     * @private
     * @type {string}
     */
    this.format_ = options.format !== undefined ? options.format : 'image/jpeg';

    /**
     * @private
     * @type {!Object}
     */
    this.dimensions_ =
      options.dimensions !== undefined ? options.dimensions : {};

    /**
     * @private
     * @type {string}
     */
    this.layer_ = options.layer;

    /**
     * @private
     * @type {string}
     */
    this.matrixSet_ = options.matrixSet;

    /**
     * @private
     * @type {string}
     */
    this.style_ = options.style;

    // FIXME: should we guess this requestEncoding from options.url(s)
    //        structure? that would mean KVP only if a template is not provided.

    /**
     * @private
     * @type {RequestEncoding}
     */
    this.requestEncoding_ = requestEncoding;

    this.setKey(this.getKeyForDimensions_());

    if (urls && urls.length > 0) {
      this.tileUrlFunction = createFromTileUrlFunctions(
        urls.map(this.createFromWMTSTemplate.bind(this)),
      );
    }
  }