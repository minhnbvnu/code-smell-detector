constructor(options) {
    options = options ? options : {};

    super(/** @type {import("./Pointer.js").Options} */ (options));

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.condition_ = options.condition ? options.condition : shiftKeyOnly;

    /**
     * @private
     * @type {number|undefined}
     */
    this.lastAngle_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.lastMagnitude_ = undefined;

    /**
     * @private
     * @type {number}
     */
    this.lastScaleDelta_ = 0;

    /**
     * @private
     * @type {number}
     */
    this.duration_ = options.duration !== undefined ? options.duration : 400;
  }