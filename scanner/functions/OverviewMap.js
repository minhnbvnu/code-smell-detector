constructor(options) {
    options = options ? options : {};

    super({
      element: document.createElement('div'),
      render: options.render,
      target: options.target,
    });

    /**
     * @private
     */
    this.boundHandleRotationChanged_ = this.handleRotationChanged_.bind(this);

    /**
     * @type {boolean}
     * @private
     */
    this.collapsed_ =
      options.collapsed !== undefined ? options.collapsed : true;

    /**
     * @private
     * @type {boolean}
     */
    this.collapsible_ =
      options.collapsible !== undefined ? options.collapsible : true;

    if (!this.collapsible_) {
      this.collapsed_ = false;
    }

    /**
     * @private
     * @type {boolean}
     */
    this.rotateWithView_ =
      options.rotateWithView !== undefined ? options.rotateWithView : false;

    /**
     * @private
     * @type {import("../extent.js").Extent|undefined}
     */
    this.viewExtent_ = undefined;

    const className =
      options.className !== undefined ? options.className : 'ol-overviewmap';

    const tipLabel =
      options.tipLabel !== undefined ? options.tipLabel : 'Overview map';

    const collapseLabel =
      options.collapseLabel !== undefined ? options.collapseLabel : '\u2039';

    if (typeof collapseLabel === 'string') {
      /**
       * @private
       * @type {HTMLElement}
       */
      this.collapseLabel_ = document.createElement('span');
      this.collapseLabel_.textContent = collapseLabel;
    } else {
      this.collapseLabel_ = collapseLabel;
    }

    const label = options.label !== undefined ? options.label : '\u203A';

    if (typeof label === 'string') {
      /**
       * @private
       * @type {HTMLElement}
       */
      this.label_ = document.createElement('span');
      this.label_.textContent = label;
    } else {
      this.label_ = label;
    }

    const activeLabel =
      this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.title = tipLabel;
    button.appendChild(activeLabel);

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this),
      false,
    );

    /**
     * @type {HTMLElement}
     * @private
     */
    this.ovmapDiv_ = document.createElement('div');
    this.ovmapDiv_.className = 'ol-overviewmap-map';

    /**
     * Explicitly given view to be used instead of a view derived from the main map.
     * @type {View}
     * @private
     */
    this.view_ = options.view;

    const ovmap = new Map({
      view: options.view,
      controls: new Collection(),
      interactions: new Collection(),
    });

    /**
     * @type {Map}
     * @private
     */
    this.ovmap_ = ovmap;

    if (options.layers) {
      options.layers.forEach(function (layer) {
        ovmap.addLayer(layer);
      });
    }

    const box = document.createElement('div');
    box.className = 'ol-overviewmap-box';
    box.style.boxSizing = 'border-box';

    /**
     * @type {import("../Overlay.js").default}
     * @private
     */
    this.boxOverlay_ = new Overlay({
      position: [0, 0],
      positioning: 'center-center',
      element: box,
    });
    this.ovmap_.addOverlay(this.boxOverlay_);

    const cssClasses =
      className +
      ' ' +
      CLASS_UNSELECTABLE +
      ' ' +
      CLASS_CONTROL +
      (this.collapsed_ && this.collapsible_ ? ' ' + CLASS_COLLAPSED : '') +
      (this.collapsible_ ? '' : ' ol-uncollapsible');
    const element = this.element;
    element.className = cssClasses;
    element.appendChild(this.ovmapDiv_);
    element.appendChild(button);

    /* Interactive map */

    const scope = this;

    const overlay = this.boxOverlay_;
    const overlayBox = this.boxOverlay_.getElement();

    /* Functions definition */

    const computeDesiredMousePosition = function (mousePosition) {
      return {
        clientX: mousePosition.clientX,
        clientY: mousePosition.clientY,
      };
    };

    const move = function (event) {
      const position = /** @type {?} */ (computeDesiredMousePosition(event));
      const coordinates = ovmap.getEventCoordinateInternal(
        /** @type {MouseEvent} */ (position),
      );

      overlay.setPosition(coordinates);
    };

    const endMoving = function (event) {
      const coordinates = ovmap.getEventCoordinateInternal(event);

      scope.getMap().getView().setCenterInternal(coordinates);

      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', endMoving);
    };

    /* Binding */

    overlayBox.addEventListener('mousedown', function () {
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', endMoving);
    });
  }