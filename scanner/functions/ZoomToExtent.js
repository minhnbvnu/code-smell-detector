constructor(options) {
    options = options ? options : {};

    super({
      element: document.createElement('div'),
      target: options.target,
    });

    /**
     * @type {?import("../extent.js").Extent|null}
     * @protected
     */
    this.extent = options.extent ? options.extent : null;

    const className =
      options.className !== undefined ? options.className : 'ol-zoom-extent';

    const label = options.label !== undefined ? options.label : 'E';
    const tipLabel =
      options.tipLabel !== undefined ? options.tipLabel : 'Fit to extent';
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.title = tipLabel;
    button.appendChild(
      typeof label === 'string' ? document.createTextNode(label) : label,
    );

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this),
      false,
    );

    const cssClasses =
      className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
    const element = this.element;
    element.className = cssClasses;
    element.appendChild(button);
  }