constructor(cfg) {
    super(cfg);

    /** @type {number} */
    this.xCenter = undefined;
    /** @type {number} */
    this.yCenter = undefined;
    /** @type {number} */
    this.drawingArea = undefined;
    /** @type {string[]} */
    this._pointLabels = [];
    this._pointLabelItems = [];
  }