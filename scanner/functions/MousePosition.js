constructor(options) {
    options = options ? options : {};

    const element = document.createElement('div');
    element.className =
      options.className !== undefined ? options.className : 'ol-mouse-position';

    super({
      element: element,
      render: options.render,
      target: options.target,
    });

    /***
     * @type {MousePositionOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {MousePositionOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {MousePositionOnSignature<void>}
     */
    this.un;

    this.addChangeListener(PROJECTION, this.handleProjectionChanged_);

    if (options.coordinateFormat) {
      this.setCoordinateFormat(options.coordinateFormat);
    }
    if (options.projection) {
      this.setProjection(options.projection);
    }

    /**
     * @private
     * @type {boolean}
     */
    this.renderOnMouseOut_ = options.placeholder !== undefined;

    /**
     * @private
     * @type {string}
     */
    this.placeholder_ = this.renderOnMouseOut_ ? options.placeholder : '&#160;';

    /**
     * @private
     * @type {string}
     */
    this.renderedHTML_ = element.innerHTML;

    /**
     * @private
     * @type {?import("../proj/Projection.js").default}
     */
    this.mapProjection_ = null;

    /**
     * @private
     * @type {?import("../proj.js").TransformFunction}
     */
    this.transform_ = null;

    /**
     * @private
     * @type {boolean}
     */
    this.wrapX_ = options.wrapX === false ? false : true;
  }