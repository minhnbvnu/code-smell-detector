constructor(options) {
    super();

    /***
     * @type {SelectOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {SelectOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {SelectOnSignature<void>}
     */
    this.un;

    options = options ? options : {};

    /**
     * @private
     */
    this.boundAddFeature_ = this.addFeature_.bind(this);

    /**
     * @private
     */
    this.boundRemoveFeature_ = this.removeFeature_.bind(this);

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.condition_ = options.condition ? options.condition : singleClick;

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.addCondition_ = options.addCondition ? options.addCondition : never;

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.removeCondition_ = options.removeCondition
      ? options.removeCondition
      : never;

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.toggleCondition_ = options.toggleCondition
      ? options.toggleCondition
      : shiftKeyOnly;

    /**
     * @private
     * @type {boolean}
     */
    this.multi_ = options.multi ? options.multi : false;

    /**
     * @private
     * @type {FilterFunction}
     */
    this.filter_ = options.filter ? options.filter : TRUE;

    /**
     * @private
     * @type {number}
     */
    this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;

    /**
     * @private
     * @type {import("../style/Style.js").default|Array<import("../style/Style.js").default>|import("../style/Style.js").StyleFunction|null}
     */
    this.style_ =
      options.style !== undefined ? options.style : getDefaultStyleFunction();

    /**
     * @private
     * @type {Collection<Feature>}
     */
    this.features_ = options.features || new Collection();

    /** @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} */
    let layerFilter;
    if (options.layers) {
      if (typeof options.layers === 'function') {
        layerFilter = options.layers;
      } else {
        const layers = options.layers;
        layerFilter = function (layer) {
          return layers.includes(layer);
        };
      }
    } else {
      layerFilter = TRUE;
    }

    /**
     * @private
     * @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean}
     */
    this.layerFilter_ = layerFilter;

    /**
     * An association between selected feature (key)
     * and layer (value)
     * @private
     * @type {Object<string, import("../layer/Layer.js").default>}
     */
    this.featureLayerAssociation_ = {};
  }