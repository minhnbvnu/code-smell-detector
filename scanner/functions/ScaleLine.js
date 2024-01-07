constructor(options) {
    options = options ? options : {};

    const element = document.createElement('div');
    element.style.pointerEvents = 'none';

    super({
      element: element,
      render: options.render,
      target: options.target,
    });

    /***
     * @type {ScaleLineOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {ScaleLineOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {ScaleLineOnSignature<void>}
     */
    this.un;

    const className =
      options.className !== undefined
        ? options.className
        : options.bar
          ? 'ol-scale-bar'
          : 'ol-scale-line';

    /**
     * @private
     * @type {HTMLElement}
     */
    this.innerElement_ = document.createElement('div');
    this.innerElement_.className = className + '-inner';

    this.element.className = className + ' ' + CLASS_UNSELECTABLE;
    this.element.appendChild(this.innerElement_);

    /**
     * @private
     * @type {?import("../View.js").State}
     */
    this.viewState_ = null;

    /**
     * @private
     * @type {number}
     */
    this.minWidth_ = options.minWidth !== undefined ? options.minWidth : 64;

    /**
     * @private
     * @type {number|undefined}
     */
    this.maxWidth_ = options.maxWidth;

    /**
     * @private
     * @type {boolean}
     */
    this.renderedVisible_ = false;

    /**
     * @private
     * @type {number|undefined}
     */
    this.renderedWidth_ = undefined;

    /**
     * @private
     * @type {string}
     */
    this.renderedHTML_ = '';

    this.addChangeListener(UNITS_PROP, this.handleUnitsChanged_);

    this.setUnits(options.units || 'metric');

    /**
     * @private
     * @type {boolean}
     */
    this.scaleBar_ = options.bar || false;

    /**
     * @private
     * @type {number}
     */
    this.scaleBarSteps_ = options.steps || 4;

    /**
     * @private
     * @type {boolean}
     */
    this.scaleBarText_ = options.text || false;

    /**
     * @private
     * @type {number|undefined}
     */
    this.dpi_ = options.dpi || undefined;
  }