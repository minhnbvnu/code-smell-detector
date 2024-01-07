constructor(opt_options) {
    const options = opt_options ? opt_options : {};

    super(
      /** @type {import("./Interaction.js").InteractionOptions} */ (options),
    );

    if (options.stopDown) {
      this.stopDown = options.stopDown;
    }

    /**
     * @private
     * @type {number}
     */
    this.scaleDeltaByPixel_ = options.delta ? options.delta : 0.01;

    /**
     * @private
     * @type {number}
     */
    this.duration_ = options.duration !== undefined ? options.duration : 250;

    /**
     * @type {boolean}
     * @private
     */
    this.handlingDownUpSequence_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.handlingDoubleDownSequence_ = false;

    /**
     * @type {ReturnType<typeof setTimeout>}
     * @private
     */
    this.doubleTapTimeoutId_ = undefined;

    /**
     * @type {!Object<string, PointerEvent>}
     * @private
     */
    this.trackedPointers_ = {};

    /**
     * @type {Array<PointerEvent>}
     * @protected
     */
    this.targetPointers = [];
  }