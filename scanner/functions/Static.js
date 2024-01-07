constructor(options) {
    const crossOrigin =
      options.crossOrigin !== undefined ? options.crossOrigin : null;

    const /** @type {import("../Image.js").LoadFunction} */ imageLoadFunction =
        options.imageLoadFunction !== undefined
          ? options.imageLoadFunction
          : defaultImageLoadFunction;

    super({
      attributions: options.attributions,
      interpolate: options.interpolate,
      projection: getProjection(options.projection),
    });

    /**
     * @private
     * @type {string}
     */
    this.url_ = options.url;

    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    this.imageExtent_ = options.imageExtent;

    /**
     * @private
     * @type {import("../Image.js").default}
     */
    this.image = null;

    this.image = new ImageWrapper(
      this.imageExtent_,
      undefined,
      1,
      createLoader({
        url: options.url,
        imageExtent: options.imageExtent,
        crossOrigin,
        load: (image, src) => {
          this.image.setImage(image);
          imageLoadFunction(this.image, src);
          return decode(image);
        },
      }),
    );

    this.image.addEventListener(
      EventType.CHANGE,
      this.handleImageChange.bind(this),
    );
  }