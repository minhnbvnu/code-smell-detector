constructor(options) {
    options = options || {};

    /**
     * @private
     * @type {string|undefined}
     */
    this.font_ = options.font;

    /**
     * @private
     * @type {number|undefined}
     */
    this.rotation_ = options.rotation;

    /**
     * @private
     * @type {boolean|undefined}
     */
    this.rotateWithView_ = options.rotateWithView;

    /**
     * @private
     * @type {number|import("../size.js").Size|undefined}
     */
    this.scale_ = options.scale;

    /**
     * @private
     * @type {import("../size.js").Size}
     */
    this.scaleArray_ = toSize(options.scale !== undefined ? options.scale : 1);

    /**
     * @private
     * @type {string|Array<string>|undefined}
     */
    this.text_ = options.text;

    /**
     * @private
     * @type {CanvasTextAlign|undefined}
     */
    this.textAlign_ = options.textAlign;

    /**
     * @private
     * @type {TextJustify|undefined}
     */
    this.justify_ = options.justify;

    /**
     * @private
     * @type {number|undefined}
     */
    this.repeat_ = options.repeat;

    /**
     * @private
     * @type {CanvasTextBaseline|undefined}
     */
    this.textBaseline_ = options.textBaseline;

    /**
     * @private
     * @type {import("./Fill.js").default|null}
     */
    this.fill_ =
      options.fill !== undefined
        ? options.fill
        : new Fill({color: DEFAULT_FILL_COLOR});

    /**
     * @private
     * @type {number}
     */
    this.maxAngle_ =
      options.maxAngle !== undefined ? options.maxAngle : Math.PI / 4;

    /**
     * @private
     * @type {TextPlacement}
     */
    this.placement_ =
      options.placement !== undefined ? options.placement : 'point';

    /**
     * @private
     * @type {boolean}
     */
    this.overflow_ = !!options.overflow;

    /**
     * @private
     * @type {import("./Stroke.js").default|null}
     */
    this.stroke_ = options.stroke !== undefined ? options.stroke : null;

    /**
     * @private
     * @type {number}
     */
    this.offsetX_ = options.offsetX !== undefined ? options.offsetX : 0;

    /**
     * @private
     * @type {number}
     */
    this.offsetY_ = options.offsetY !== undefined ? options.offsetY : 0;

    /**
     * @private
     * @type {import("./Fill.js").default|null}
     */
    this.backgroundFill_ = options.backgroundFill
      ? options.backgroundFill
      : null;

    /**
     * @private
     * @type {import("./Stroke.js").default|null}
     */
    this.backgroundStroke_ = options.backgroundStroke
      ? options.backgroundStroke
      : null;

    /**
     * @private
     * @type {Array<number>|null}
     */
    this.padding_ = options.padding === undefined ? null : options.padding;
  }