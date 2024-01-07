constructor(options) {
    options = options || {};

    super(/** @type {import("./Pointer.js").Options} */ (options));

    /***
     * @type {ExtentOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {ExtentOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {ExtentOnSignature<void>}
     */
    this.un;

    /**
     * Condition
     * @type {import("../events/condition.js").Condition}
     * @private
     */
    this.condition_ = options.condition ? options.condition : always;

    /**
     * Extent of the drawn box
     * @type {import("../extent.js").Extent}
     * @private
     */
    this.extent_ = null;

    /**
     * Handler for pointer move events
     * @type {function (import("../coordinate.js").Coordinate): import("../extent.js").Extent|null}
     * @private
     */
    this.pointerHandler_ = null;

    /**
     * Pixel threshold to snap to extent
     * @type {number}
     * @private
     */
    this.pixelTolerance_ =
      options.pixelTolerance !== undefined ? options.pixelTolerance : 10;

    /**
     * Is the pointer snapped to an extent vertex
     * @type {boolean}
     * @private
     */
    this.snappedToVertex_ = false;

    /**
     * Feature for displaying the visible extent
     * @type {Feature}
     * @private
     */
    this.extentFeature_ = null;

    /**
     * Feature for displaying the visible pointer
     * @type {Feature<Point>}
     * @private
     */
    this.vertexFeature_ = null;

    if (!options) {
      options = {};
    }

    /**
     * Layer for the extentFeature
     * @type {VectorLayer}
     * @private
     */
    this.extentOverlay_ = new VectorLayer({
      source: new VectorSource({
        useSpatialIndex: false,
        wrapX: !!options.wrapX,
      }),
      style: options.boxStyle
        ? options.boxStyle
        : getDefaultExtentStyleFunction(),
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    /**
     * Layer for the vertexFeature
     * @type {VectorLayer}
     * @private
     */
    this.vertexOverlay_ = new VectorLayer({
      source: new VectorSource({
        useSpatialIndex: false,
        wrapX: !!options.wrapX,
      }),
      style: options.pointerStyle
        ? options.pointerStyle
        : getDefaultPointerStyleFunction(),
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    if (options.extent) {
      this.setExtent(options.extent);
    }
  }