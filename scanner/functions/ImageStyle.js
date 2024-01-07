constructor(options) {
    /**
     * @private
     * @type {number}
     */
    this.opacity_ = options.opacity;

    /**
     * @private
     * @type {boolean}
     */
    this.rotateWithView_ = options.rotateWithView;

    /**
     * @private
     * @type {number}
     */
    this.rotation_ = options.rotation;

    /**
     * @private
     * @type {number|import("../size.js").Size}
     */
    this.scale_ = options.scale;

    /**
     * @private
     * @type {import("../size.js").Size}
     */
    this.scaleArray_ = toSize(options.scale);

    /**
     * @private
     * @type {Array<number>}
     */
    this.displacement_ = options.displacement;

    /**
     * @private
     * @type {"declutter"|"obstacle"|"none"|undefined}
     */
    this.declutterMode_ = options.declutterMode;
  }