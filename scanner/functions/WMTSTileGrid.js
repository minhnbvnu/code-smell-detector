constructor(options) {
    super({
      extent: options.extent,
      origin: options.origin,
      origins: options.origins,
      resolutions: options.resolutions,
      tileSize: options.tileSize,
      tileSizes: options.tileSizes,
      sizes: options.sizes,
    });

    /**
     * @private
     * @type {!Array<string>}
     */
    this.matrixIds_ = options.matrixIds;
  }