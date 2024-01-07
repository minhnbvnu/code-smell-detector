constructor(type, map, frameState) {
    super(type);

    /**
     * The map where the event occurred.
     * @type {import("./Map.js").default}
     * @api
     */
    this.map = map;

    /**
     * The frame state at the time of the event.
     * @type {?import("./Map.js").FrameState}
     * @api
     */
    this.frameState = frameState !== undefined ? frameState : null;
  }