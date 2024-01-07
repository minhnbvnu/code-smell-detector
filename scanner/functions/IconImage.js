constructor(image, src, crossOrigin, imageState, color) {
    super();

    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement|ImageBitmap}
     */
    this.hitDetectionImage_ = null;

    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement|ImageBitmap|null}
     */
    this.image_ = image;

    /**
     * @private
     * @type {string|null}
     */
    this.crossOrigin_ = crossOrigin;

    /**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */
    this.canvas_ = {};

    /**
     * @private
     * @type {import("../color.js").Color|string|null}
     */
    this.color_ = color;

    /**
     * @private
     * @type {import("../ImageState.js").default}
     */
    this.imageState_ = imageState === undefined ? ImageState.IDLE : imageState;

    /**
     * @private
     * @type {import("../size.js").Size|null}
     */
    this.size_ =
      image && image.width && image.height ? [image.width, image.height] : null;

    /**
     * @private
     * @type {string|undefined}
     */
    this.src_ = src;

    /**
     * @private
     */
    this.tainted_;

    /**
     * @private
     * @type {Promise<void>|null}
     */
    this.ready_ = null;
  }