constructor(options) {
    super();

    /***
     * @type {OverlayOnSignature<import("./events").EventsKey>}
     */
    this.on;

    /***
     * @type {OverlayOnSignature<import("./events").EventsKey>}
     */
    this.once;

    /***
     * @type {OverlayOnSignature<void>}
     */
    this.un;

    /**
     * @protected
     * @type {Options}
     */
    this.options = options;

    /**
     * @protected
     * @type {number|string|undefined}
     */
    this.id = options.id;

    /**
     * @protected
     * @type {boolean}
     */
    this.insertFirst =
      options.insertFirst !== undefined ? options.insertFirst : true;

    /**
     * @protected
     * @type {boolean}
     */
    this.stopEvent = options.stopEvent !== undefined ? options.stopEvent : true;

    /**
     * @protected
     * @type {HTMLElement}
     */
    this.element = document.createElement('div');
    this.element.className =
      options.className !== undefined
        ? options.className
        : 'ol-overlay-container ' + CLASS_SELECTABLE;
    this.element.style.position = 'absolute';
    this.element.style.pointerEvents = 'auto';

    /**
     * @protected
     * @type {PanIntoViewOptions|undefined}
     */
    this.autoPan = options.autoPan === true ? {} : options.autoPan || undefined;

    /**
     * @protected
     * @type {{transform_: string,
     *         visible: boolean}}
     */
    this.rendered = {
      transform_: '',
      visible: true,
    };

    /**
     * @protected
     * @type {?import("./events.js").EventsKey}
     */
    this.mapPostrenderListenerKey = null;

    this.addChangeListener(Property.ELEMENT, this.handleElementChanged);
    this.addChangeListener(Property.MAP, this.handleMapChanged);
    this.addChangeListener(Property.OFFSET, this.handleOffsetChanged);
    this.addChangeListener(Property.POSITION, this.handlePositionChanged);
    this.addChangeListener(Property.POSITIONING, this.handlePositioningChanged);

    if (options.element !== undefined) {
      this.setElement(options.element);
    }

    this.setOffset(options.offset !== undefined ? options.offset : [0, 0]);

    this.setPositioning(options.positioning || 'top-left');

    if (options.position !== undefined) {
      this.setPosition(options.position);
    }
  }