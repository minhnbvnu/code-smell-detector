constructor(options) {
    options = options || {};

    super({
      attributions: options.attributions,
      interpolate: true,
      projection: undefined,
      state: 'ready',
      wrapX: options.wrapX !== undefined ? options.wrapX : true,
    });

    /***
     * @type {VectorSourceOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {VectorSourceOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {VectorSourceOnSignature<void>}
     */
    this.un;

    /**
     * @private
     * @type {import("../featureloader.js").FeatureLoader}
     */
    this.loader_ = VOID;

    /**
     * @private
     * @type {import("../format/Feature.js").default|undefined}
     */
    this.format_ = options.format;

    /**
     * @private
     * @type {boolean}
     */
    this.overlaps_ = options.overlaps === undefined ? true : options.overlaps;

    /**
     * @private
     * @type {string|import("../featureloader.js").FeatureUrlFunction|undefined}
     */
    this.url_ = options.url;

    if (options.loader !== undefined) {
      this.loader_ = options.loader;
    } else if (this.url_ !== undefined) {
      assert(this.format_, '`format` must be set when `url` is set');
      // create a XHR feature loader for "url" and "format"
      this.loader_ = xhr(
        this.url_,
        /** @type {import("../format/Feature.js").default} */ (this.format_),
      );
    }

    /**
     * @private
     * @type {LoadingStrategy}
     */
    this.strategy_ =
      options.strategy !== undefined ? options.strategy : allStrategy;

    const useSpatialIndex =
      options.useSpatialIndex !== undefined ? options.useSpatialIndex : true;

    /**
     * @private
     * @type {RBush<FeatureClass>}
     */
    this.featuresRtree_ = useSpatialIndex ? new RBush() : null;

    /**
     * @private
     * @type {RBush<{extent: import("../extent.js").Extent}>}
     */
    this.loadedExtentsRtree_ = new RBush();

    /**
     * @type {number}
     * @private
     */
    this.loadingExtentsCount_ = 0;

    /**
     * @private
     * @type {!Object<string, FeatureClass>}
     */
    this.nullGeometryFeatures_ = {};

    /**
     * A lookup of features by id (the return from feature.getId()).
     * @private
     * @type {!Object<string, FeatureClass|Array<RenderFeature>>}
     */
    this.idIndex_ = {};

    /**
     * A lookup of features by uid (using getUid(feature)).
     * @private
     * @type {!Object<string, FeatureClass>}
     */
    this.uidIndex_ = {};

    /**
     * @private
     * @type {Object<string, Array<import("../events.js").EventsKey>>}
     */
    this.featureChangeKeys_ = {};

    /**
     * @private
     * @type {Collection<FeatureClass>|null}
     */
    this.featuresCollection_ = null;

    /** @type {Collection<FeatureClass>} */
    let collection;
    /** @type {Array<FeatureClass>} */
    let features;
    if (Array.isArray(options.features)) {
      features = options.features;
    } else if (options.features) {
      collection = options.features;
      features = collection.getArray();
    }
    if (!useSpatialIndex && collection === undefined) {
      collection = new Collection(features);
    }
    if (features !== undefined) {
      this.addFeaturesInternal(features);
    }
    if (collection !== undefined) {
      this.bindFeaturesCollection_(collection);
    }
  }