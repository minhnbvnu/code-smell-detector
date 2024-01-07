constructor(
    context,
    pixelRatio,
    extent,
    transform,
    viewRotation,
    squaredTolerance,
    userTransform,
  ) {
    super();

    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    this.context_ = context;

    /**
     * @private
     * @type {number}
     */
    this.pixelRatio_ = pixelRatio;

    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */
    this.extent_ = extent;

    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */
    this.transform_ = transform;

    /**
     * @private
     * @type {number}
     */
    this.transformRotation_ = transform
      ? toFixed(Math.atan2(transform[1], transform[0]), 10)
      : 0;

    /**
     * @private
     * @type {number}
     */
    this.viewRotation_ = viewRotation;

    /**
     * @private
     * @type {number}
     */
    this.squaredTolerance_ = squaredTolerance;

    /**
     * @private
     * @type {import("../../proj.js").TransformFunction}
     */
    this.userTransform_ = userTransform;

    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */
    this.contextFillState_ = null;

    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */
    this.contextStrokeState_ = null;

    /**
     * @private
     * @type {?import("../canvas.js").TextState}
     */
    this.contextTextState_ = null;

    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */
    this.fillState_ = null;

    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */
    this.strokeState_ = null;

    /**
     * @private
     * @type {import('../../DataTile.js').ImageLike}
     */
    this.image_ = null;

    /**
     * @private
     * @type {number}
     */
    this.imageAnchorX_ = 0;

    /**
     * @private
     * @type {number}
     */
    this.imageAnchorY_ = 0;

    /**
     * @private
     * @type {number}
     */
    this.imageHeight_ = 0;

    /**
     * @private
     * @type {number}
     */
    this.imageOpacity_ = 0;

    /**
     * @private
     * @type {number}
     */
    this.imageOriginX_ = 0;

    /**
     * @private
     * @type {number}
     */
    this.imageOriginY_ = 0;

    /**
     * @private
     * @type {boolean}
     */
    this.imageRotateWithView_ = false;

    /**
     * @private
     * @type {number}
     */
    this.imageRotation_ = 0;

    /**
     * @private
     * @type {import("../../size.js").Size}
     */
    this.imageScale_ = [0, 0];

    /**
     * @private
     * @type {number}
     */
    this.imageWidth_ = 0;

    /**
     * @private
     * @type {string}
     */
    this.text_ = '';

    /**
     * @private
     * @type {number}
     */
    this.textOffsetX_ = 0;

    /**
     * @private
     * @type {number}
     */
    this.textOffsetY_ = 0;

    /**
     * @private
     * @type {boolean}
     */
    this.textRotateWithView_ = false;

    /**
     * @private
     * @type {number}
     */
    this.textRotation_ = 0;

    /**
     * @private
     * @type {import("../../size.js").Size}
     */
    this.textScale_ = [0, 0];

    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */
    this.textFillState_ = null;

    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */
    this.textStrokeState_ = null;

    /**
     * @private
     * @type {?import("../canvas.js").TextState}
     */
    this.textState_ = null;

    /**
     * @private
     * @type {Array<number>}
     */
    this.pixelCoordinates_ = [];

    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */
    this.tmpLocalTransform_ = createTransform();
  }