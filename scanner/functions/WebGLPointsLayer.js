constructor(options) {
    const baseOptions = Object.assign({}, options);

    super(baseOptions);

    /**
     * @private
     * @type {import('../webgl/styleparser.js').StyleParseResult}
     */
    this.parseResult_ = parseLiteralStyle(options.style);

    /**
     * @type {Object<string, (string|number|Array<number>|boolean)>}
     * @private
     */
    this.styleVariables_ = options.style.variables || {};

    /**
     * @private
     * @type {boolean}
     */
    this.hitDetectionDisabled_ = !!options.disableHitDetection;
  }