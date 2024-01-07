constructor(options) {
    super();

    options = options ? options : {};

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.condition_ = options.condition
      ? options.condition
      : function (mapBrowserEvent) {
          return (
            !platformModifierKey(mapBrowserEvent) &&
            targetNotEditable(mapBrowserEvent)
          );
        };

    /**
     * @private
     * @type {number}
     */
    this.delta_ = options.delta ? options.delta : 1;

    /**
     * @private
     * @type {number}
     */
    this.duration_ = options.duration !== undefined ? options.duration : 100;
  }