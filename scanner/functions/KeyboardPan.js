constructor(options) {
    super();

    options = options || {};

    /**
     * @private
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Browser event.
     * @return {boolean} Combined condition result.
     */
    this.defaultCondition_ = function (mapBrowserEvent) {
      return (
        noModifierKeys(mapBrowserEvent) && targetNotEditable(mapBrowserEvent)
      );
    };

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.condition_ =
      options.condition !== undefined
        ? options.condition
        : this.defaultCondition_;

    /**
     * @private
     * @type {number}
     */
    this.duration_ = options.duration !== undefined ? options.duration : 100;

    /**
     * @private
     * @type {number}
     */
    this.pixelDelta_ =
      options.pixelDelta !== undefined ? options.pixelDelta : 128;
  }