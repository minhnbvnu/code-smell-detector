constructor(options) {
    super({
      opacity: 1,
      rotateWithView:
        options.rotateWithView !== undefined ? options.rotateWithView : false,
      rotation: options.rotation !== undefined ? options.rotation : 0,
      scale: options.scale !== undefined ? options.scale : 1,
      displacement:
        options.displacement !== undefined ? options.displacement : [0, 0],
      declutterMode: options.declutterMode,
    });

    /**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */
    this.canvases_;

    /**
     * @private
     * @type {HTMLCanvasElement|null}
     */
    this.hitDetectionCanvas_ = null;

    /**
     * @private
     * @type {import("./Fill.js").default|null}
     */
    this.fill_ = options.fill !== undefined ? options.fill : null;

    /**
     * @private
     * @type {Array<number>}
     */
    this.origin_ = [0, 0];

    /**
     * @private
     * @type {number}
     */
    this.points_ = options.points;

    /**
     * @protected
     * @type {number}
     */
    this.radius_ = options.radius;

    /**
     * @private
     * @type {number|undefined}
     */
    this.radius2_ = options.radius2;

    /**
     * @private
     * @type {number}
     */
    this.angle_ = options.angle !== undefined ? options.angle : 0;

    /**
     * @private
     * @type {import("./Stroke.js").default|null}
     */
    this.stroke_ = options.stroke !== undefined ? options.stroke : null;

    /**
     * @private
     * @type {import("../size.js").Size}
     */
    this.size_;

    /**
     * @private
     * @type {RenderOptions}
     */
    this.renderOptions_;

    this.imageState_ =
      this.fill_ && this.fill_.loading()
        ? ImageState.LOADING
        : ImageState.LOADED;
    if (this.imageState_ === ImageState.LOADING) {
      this.ready().then(() => (this.imageState_ = ImageState.LOADED));
    }
    this.render();
  }