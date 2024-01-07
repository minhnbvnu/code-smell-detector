constructor(options) {
    super();

    /***
     * @type {InteractionOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {InteractionOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {InteractionOnSignature<void>}
     */
    this.un;

    if (options && options.handleEvent) {
      this.handleEvent = options.handleEvent;
    }

    /**
     * @private
     * @type {import("../Map.js").default|null}
     */
    this.map_ = null;

    this.setActive(true);
  }