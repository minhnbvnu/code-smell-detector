constructor(options) {
    options = options ? options : {};

    super({
      element: document.createElement('div'),
      target: options.target,
    });

    /***
     * @type {FullScreenOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {FullScreenOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {FullScreenOnSignature<void>}
     */
    this.un;

    /**
     * @private
     * @type {boolean}
     */
    this.keys_ = options.keys !== undefined ? options.keys : false;

    /**
     * @private
     * @type {HTMLElement|string|undefined}
     */
    this.source_ = options.source;

    /**
     * @type {boolean}
     * @private
     */
    this.isInFullscreen_ = false;

    /**
     * @private
     */
    this.boundHandleMapTargetChange_ = this.handleMapTargetChange_.bind(this);

    /**
     * @private
     * @type {string}
     */
    this.cssClassName_ =
      options.className !== undefined ? options.className : 'ol-full-screen';

    /**
     * @private
     * @type {Array<import("../events.js").EventsKey>}
     */
    this.documentListeners_ = [];

    /**
     * @private
     * @type {Array<string>}
     */
    this.activeClassName_ =
      options.activeClassName !== undefined
        ? options.activeClassName.split(' ')
        : [this.cssClassName_ + '-true'];

    /**
     * @private
     * @type {Array<string>}
     */
    this.inactiveClassName_ =
      options.inactiveClassName !== undefined
        ? options.inactiveClassName.split(' ')
        : [this.cssClassName_ + '-false'];

    const label = options.label !== undefined ? options.label : '\u2922';

    /**
     * @private
     * @type {Text|HTMLElement}
     */
    this.labelNode_ =
      typeof label === 'string' ? document.createTextNode(label) : label;

    const labelActive =
      options.labelActive !== undefined ? options.labelActive : '\u00d7';

    /**
     * @private
     * @type {Text|HTMLElement}
     */
    this.labelActiveNode_ =
      typeof labelActive === 'string'
        ? document.createTextNode(labelActive)
        : labelActive;

    const tipLabel = options.tipLabel ? options.tipLabel : 'Toggle full-screen';

    /**
     * @private
     * @type {HTMLElement}
     */
    this.button_ = document.createElement('button');
    this.button_.title = tipLabel;
    this.button_.setAttribute('type', 'button');
    this.button_.appendChild(this.labelNode_);
    this.button_.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this),
      false,
    );
    this.setClassName_(this.button_, this.isInFullscreen_);

    this.element.className = `${this.cssClassName_} ${CLASS_UNSELECTABLE} ${CLASS_CONTROL}`;
    this.element.appendChild(this.button_);
  }