constructor(options) {
    options = options ? options : {};

    super({
      handleEvent: TRUE,
    });

    /***
     * @type {DragAndDropOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {DragAndDropOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {DragAndDropOnSignature<void>}
     */
    this.un;

    /**
     * @private
     * @type {boolean}
     */
    this.readAsBuffer_ = false;

    /**
     * @private
     * @type {Array<import("../format/Feature.js").default>}
     */
    this.formats_ = [];
    const formatConstructors = options.formatConstructors
      ? options.formatConstructors
      : [];
    for (let i = 0, ii = formatConstructors.length; i < ii; ++i) {
      let format = formatConstructors[i];
      if (typeof format === 'function') {
        format = new format();
      }
      this.formats_.push(format);
      this.readAsBuffer_ =
        this.readAsBuffer_ || format.getType() === 'arraybuffer';
    }

    /**
     * @private
     * @type {import("../proj/Projection.js").default}
     */
    this.projection_ = options.projection
      ? getProjection(options.projection)
      : null;

    /**
     * @private
     * @type {?Array<import("../events.js").EventsKey>}
     */
    this.dropListenKeys_ = null;

    /**
     * @private
     * @type {import("../source/Vector.js").default}
     */
    this.source_ = options.source || null;

    /**
     * @private
     * @type {HTMLElement|null}
     */
    this.target = options.target ? options.target : null;
  }