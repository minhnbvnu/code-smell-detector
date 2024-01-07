constructor(options) {
    options = options ? Object.assign({}, options) : {};

    const style = options.style || {};
    delete options.style;

    const cacheSize = options.cacheSize;
    delete options.cacheSize;

    super(options);

    /**
     * @type {Array<SourceType>|function(import("../extent.js").Extent, number):Array<SourceType>}
     * @private
     */
    this.sources_ = options.sources;

    /**
     * @type {SourceType|null}
     * @private
     */
    this.renderedSource_ = null;

    /**
     * @type {number}
     * @private
     */
    this.renderedResolution_ = NaN;

    /**
     * @type {Style}
     * @private
     */
    this.style_ = style;

    /**
     * @type {number}
     * @private
     */
    this.cacheSize_ = cacheSize;

    /**
     * @type {Object<string, (string|number)>}
     * @private
     */
    this.styleVariables_ = this.style_.variables || {};

    this.addChangeListener(LayerProperty.SOURCE, this.handleSourceUpdate_);
  }