constructor(type, map, originalEvent, dragging, frameState, activePointers) {
    super(type, map, frameState);

    /**
     * The original browser event.
     * @const
     * @type {EVENT}
     * @api
     */
    this.originalEvent = originalEvent;

    /**
     * The map pixel relative to the viewport corresponding to the original browser event.
     * @type {?import("./pixel.js").Pixel}
     */
    this.pixel_ = null;

    /**
     * The coordinate in the user projection corresponding to the original browser event.
     * @type {?import("./coordinate.js").Coordinate}
     */
    this.coordinate_ = null;

    /**
     * Indicates if the map is currently being dragged. Only set for
     * `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
     *
     * @type {boolean}
     * @api
     */
    this.dragging = dragging !== undefined ? dragging : false;

    /**
     * @type {Array<PointerEvent>|undefined}
     */
    this.activePointers = activePointers;
  }