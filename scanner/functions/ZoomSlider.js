constructor(options) {
    options = options ? options : {};

    super({
      target: options.target,
      element: document.createElement('div'),
      render: options.render,
    });

    /**
     * @type {!Array<import("../events.js").EventsKey>}
     * @private
     */
    this.dragListenerKeys_ = [];

    /**
     * Will hold the current resolution of the view.
     *
     * @type {number|undefined}
     * @private
     */
    this.currentResolution_ = undefined;

    /**
     * The direction of the slider. Will be determined from actual display of the
     * container and defaults to Direction.VERTICAL.
     *
     * @type {Direction}
     * @private
     */
    this.direction_ = Direction.VERTICAL;

    /**
     * @type {boolean}
     * @private
     */
    this.dragging_;

    /**
     * @type {number}
     * @private
     */
    this.heightLimit_ = 0;

    /**
     * @type {number}
     * @private
     */
    this.widthLimit_ = 0;

    /**
     * @type {number|undefined}
     * @private
     */
    this.startX_;

    /**
     * @type {number|undefined}
     * @private
     */
    this.startY_;

    /**
     * The calculated thumb size (border box plus margins).  Set when initSlider_
     * is called.
     * @type {import("../size.js").Size}
     * @private
     */
    this.thumbSize_ = null;

    /**
     * Whether the slider is initialized.
     * @type {boolean}
     * @private
     */
    this.sliderInitialized_ = false;

    /**
     * @type {number}
     * @private
     */
    this.duration_ = options.duration !== undefined ? options.duration : 200;

    const className =
      options.className !== undefined ? options.className : 'ol-zoomslider';
    const thumbElement = document.createElement('button');
    thumbElement.setAttribute('type', 'button');
    thumbElement.className = className + '-thumb ' + CLASS_UNSELECTABLE;
    const containerElement = this.element;
    containerElement.className =
      className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
    containerElement.appendChild(thumbElement);

    containerElement.addEventListener(
      PointerEventType.POINTERDOWN,
      this.handleDraggerStart_.bind(this),
      false,
    );
    containerElement.addEventListener(
      PointerEventType.POINTERMOVE,
      this.handleDraggerDrag_.bind(this),
      false,
    );
    containerElement.addEventListener(
      PointerEventType.POINTERUP,
      this.handleDraggerEnd_.bind(this),
      false,
    );

    containerElement.addEventListener(
      EventType.CLICK,
      this.handleContainerClick_.bind(this),
      false,
    );
    thumbElement.addEventListener(EventType.CLICK, stopPropagation, false);
  }