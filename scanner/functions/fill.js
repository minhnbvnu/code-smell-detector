constructor(options) {
    options = options || {};

    /**
     * @private
     * @type {import("./IconImage.js").default|null}
     */
    this.patternImage_ = null;

    /**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null}
     */
    this.color_ = null;
    if (options.color !== undefined) {
      this.setColor(options.color);
    }
  }