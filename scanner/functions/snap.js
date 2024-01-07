constructor(options) {
    options = options ? options : {};

    const pointerOptions = /** @type {import("./Pointer.js").Options} */ (
      options
    );

    if (!pointerOptions.handleDownEvent) {
      pointerOptions.handleDownEvent = TRUE;
    }

    if (!pointerOptions.stopDown) {
      pointerOptions.stopDown = FALSE;
    }

    super(pointerOptions);

    /***
     * @type {SnapOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {SnapOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {SnapOnSignature<void>}
     */
    this.un;

    /**
     * @type {import("../source/Vector.js").default|null}
     * @private
     */
    this.source_ = options.source ? options.source : null;

    /**
     * @private
     * @type {boolean}
     */
    this.vertex_ = options.vertex !== undefined ? options.vertex : true;

    /**
     * @private
     * @type {boolean}
     */
    this.edge_ = options.edge !== undefined ? options.edge : true;

    /**
     * @type {import("../Collection.js").default<import("../Feature.js").default>|null}
     * @private
     */
    this.features_ = options.features ? options.features : null;

    /**
     * @type {Array<import("../events.js").EventsKey>}
     * @private
     */
    this.featuresListenerKeys_ = [];

    /**
     * @type {Object<string, import("../events.js").EventsKey>}
     * @private
     */
    this.featureChangeListenerKeys_ = {};

    /**
     * Extents are preserved so indexed segment can be quickly removed
     * when its feature geometry changes
     * @type {Object<string, import("../extent.js").Extent>}
     * @private
     */
    this.indexedFeaturesExtents_ = {};

    /**
     * If a feature geometry changes while a pointer drag|move event occurs, the
     * feature doesn't get updated right away.  It will be at the next 'pointerup'
     * event fired.
     * @type {!Object<string, import("../Feature.js").default>}
     * @private
     */
    this.pendingFeatures_ = {};

    /**
     * @type {number}
     * @private
     */
    this.pixelTolerance_ =
      options.pixelTolerance !== undefined ? options.pixelTolerance : 10;

    /**
     * Segment RTree for each layer
     * @type {import("../structs/RBush.js").default<SegmentData>}
     * @private
     */
    this.rBush_ = new RBush();

    /**
     * @const
     * @private
     * @type {Object<string, function(Array<Array<import('../coordinate.js').Coordinate>>, import("../geom/Geometry.js").default): void>}
     */
    this.GEOMETRY_SEGMENTERS_ = {
      'Point': this.segmentPointGeometry_.bind(this),
      'LineString': this.segmentLineStringGeometry_.bind(this),
      'LinearRing': this.segmentLineStringGeometry_.bind(this),
      'Polygon': this.segmentPolygonGeometry_.bind(this),
      'MultiPoint': this.segmentMultiPointGeometry_.bind(this),
      'MultiLineString': this.segmentMultiLineStringGeometry_.bind(this),
      'MultiPolygon': this.segmentMultiPolygonGeometry_.bind(this),
      'GeometryCollection': this.segmentGeometryCollectionGeometry_.bind(this),
      'Circle': this.segmentCircleGeometry_.bind(this),
    };
  }