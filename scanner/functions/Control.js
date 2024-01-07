constructor(options) {
    super();

    const element = options.element;
    if (element && !options.target && !element.style.pointerEvents) {
      element.style.pointerEvents = 'auto';
    }

    /**
     * @protected
     * @type {HTMLElement}
     */
    this.element = element ? element : null;

    /**
     * @private
     * @type {HTMLElement}
     */
    this.target_ = null;

    /**
     * @private
     * @type {import("../Map.js").default|null}
     */
    this.map_ = null;

    /**
     * @protected
     * @type {!Array<import("../events.js").EventsKey>}
     */
    this.listenerKeys = [];

    if (options.render) {
      this.render = options.render;
    }

    if (options.target) {
      this.setTarget(options.target);
    }
  }