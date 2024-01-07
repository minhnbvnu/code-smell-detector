constructor(cfg) {
    super(cfg);

    /** @type {number} */
    this.start = undefined;
    /** @type {number} */
    this.end = undefined;
    /** @type {number} */
    this._startValue = undefined;
    /** @type {number} */
    this._endValue = undefined;
    this._valueRange = 0;
  }