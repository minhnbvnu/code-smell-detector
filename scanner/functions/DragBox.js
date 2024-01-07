constructor(options) {
    super();

    /***
     * @type {DragBoxOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {DragBoxOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {DragBoxOnSignature<void>}
     */
    this.un;

    options = options ? options : {};

    /**
     * @type {import("../render/Box.js").default}
     * @private
     */
    this.box_ = new RenderBox(options.className || 'ol-dragbox');

    /**
     * @type {number}
     * @private
     */
    this.minArea_ = options.minArea !== undefined ? options.minArea : 64;

    if (options.onBoxEnd) {
      this.onBoxEnd = options.onBoxEnd;
    }

    /**
     * @type {import("../pixel.js").Pixel}
     * @private
     */
    this.startPixel_ = null;

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.condition_ = options.condition ? options.condition : mouseActionButton;

    /**
     * @private
     * @type {EndCondition}
     */
    this.boxEndCondition_ = options.boxEndCondition
      ? options.boxEndCondition
      : this.defaultBoxEndCondition;
  }