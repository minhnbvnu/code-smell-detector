constructor(options) {
    options = options || {};
    const baseOptions = /** @type {Options} */ (Object.assign({}, options));
    delete baseOptions.layers;

    let layers = options.layers;

    super(baseOptions);

    /***
     * @type {GroupOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {GroupOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {GroupOnSignature<void>}
     */
    this.un;

    /**
     * @private
     * @type {Array<import("../events.js").EventsKey>}
     */
    this.layersListenerKeys_ = [];

    /**
     * @private
     * @type {Object<string, Array<import("../events.js").EventsKey>>}
     */
    this.listenerKeys_ = {};

    this.addChangeListener(Property.LAYERS, this.handleLayersChanged_);

    if (layers) {
      if (Array.isArray(layers)) {
        layers = new Collection(layers.slice(), {unique: true});
      } else {
        assert(
          typeof (/** @type {?} */ (layers).getArray) === 'function',
          'Expected `layers` to be an array or a `Collection`',
        );
      }
    } else {
      layers = new Collection(undefined, {unique: true});
    }

    this.setLayers(layers);
  }