constructor(target) {
    super();

    /**
     * @private
     * @type {*}
     */
    this.eventTarget_ = target;

    /**
     * @private
     * @type {Object<string, number>|null}
     */
    this.pendingRemovals_ = null;

    /**
     * @private
     * @type {Object<string, number>|null}
     */
    this.dispatching_ = null;

    /**
     * @private
     * @type {Object<string, Array<import("../events.js").Listener>>|null}
     */
    this.listeners_ = null;
  }