constructor(options) {
    super(/** @type {import("./Pointer.js").Options} */ (options));

    /***
     * @type {ModifyOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {ModifyOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {ModifyOnSignature<void>}
     */
    this.un;

    /** @private */
    this.boundHandleFeatureChange_ = this.handleFeatureChange_.bind(this);

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.condition_ = options.condition ? options.condition : primaryAction;

    /**
     * @private
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Browser event.
     * @return {boolean} Combined condition result.
     */
    this.defaultDeleteCondition_ = function (mapBrowserEvent) {
      return altKeyOnly(mapBrowserEvent) && singleClick(mapBrowserEvent);
    };

    /**
     * @type {import("../events/condition.js").Condition}
     * @private
     */
    this.deleteCondition_ = options.deleteCondition
      ? options.deleteCondition
      : this.defaultDeleteCondition_;

    /**
     * @type {import("../events/condition.js").Condition}
     * @private
     */
    this.insertVertexCondition_ = options.insertVertexCondition
      ? options.insertVertexCondition
      : always;

    /**
     * Editing vertex.
     * @type {Feature<Point>}
     * @private
     */
    this.vertexFeature_ = null;

    /**
     * Segments intersecting {@link this.vertexFeature_} by segment uid.
     * @type {Object<string, boolean>}
     * @private
     */
    this.vertexSegments_ = null;

    /**
     * @type {import("../pixel.js").Pixel}
     * @private
     */
    this.lastPixel_ = [0, 0];

    /**
     * Tracks if the next `singleclick` event should be ignored to prevent
     * accidental deletion right after vertex creation.
     * @type {boolean}
     * @private
     */
    this.ignoreNextSingleClick_ = false;

    /**
     * @type {Collection<Feature>}
     * @private
     */
    this.featuresBeingModified_ = null;

    /**
     * Segment RTree for each layer
     * @type {RBush<SegmentData>}
     * @private
     */
    this.rBush_ = new RBush();

    /**
     * @type {number}
     * @private
     */
    this.pixelTolerance_ =
      options.pixelTolerance !== undefined ? options.pixelTolerance : 10;

    /**
     * @type {boolean}
     * @private
     */
    this.snappedToVertex_ = false;

    /**
     * Indicate whether the interaction is currently changing a feature's
     * coordinates.
     * @type {boolean}
     * @private
     */
    this.changingFeature_ = false;

    /**
     * @type {Array}
     * @private
     */
    this.dragSegments_ = [];

    /**
     * Draw overlay where sketch features are drawn.
     * @type {VectorLayer}
     * @private
     */
    this.overlay_ = new VectorLayer({
      source: new VectorSource({
        useSpatialIndex: false,
        wrapX: !!options.wrapX,
      }),
      style: options.style ? options.style : getDefaultStyleFunction(),
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    /**
     * @const
     * @private
     * @type {!Object<string, function(Feature, import("../geom/Geometry.js").default): void>}
     */
    this.SEGMENT_WRITERS_ = {
      'Point': this.writePointGeometry_.bind(this),
      'LineString': this.writeLineStringGeometry_.bind(this),
      'LinearRing': this.writeLineStringGeometry_.bind(this),
      'Polygon': this.writePolygonGeometry_.bind(this),
      'MultiPoint': this.writeMultiPointGeometry_.bind(this),
      'MultiLineString': this.writeMultiLineStringGeometry_.bind(this),
      'MultiPolygon': this.writeMultiPolygonGeometry_.bind(this),
      'Circle': this.writeCircleGeometry_.bind(this),
      'GeometryCollection': this.writeGeometryCollectionGeometry_.bind(this),
    };

    /**
     * @type {VectorSource}
     * @private
     */
    this.source_ = null;

    /**
     * @type {boolean|import("../layer/BaseVector").default}
     */
    this.hitDetection_ = null;

    /** @type {Collection<Feature>} */
    let features;
    if (options.features) {
      features = options.features;
    } else if (options.source) {
      this.source_ = options.source;
      features = new Collection(this.source_.getFeatures());
      this.source_.addEventListener(
        VectorEventType.ADDFEATURE,
        this.handleSourceAdd_.bind(this),
      );
      this.source_.addEventListener(
        VectorEventType.REMOVEFEATURE,
        this.handleSourceRemove_.bind(this),
      );
    }
    if (!features) {
      throw new Error(
        'The modify interaction requires features, a source or a layer',
      );
    }
    if (options.hitDetection) {
      this.hitDetection_ = options.hitDetection;
    }

    /**
     * @type {Collection<Feature>}
     * @private
     */
    this.features_ = features;

    this.features_.forEach(this.addFeature_.bind(this));
    this.features_.addEventListener(
      CollectionEventType.ADD,
      this.handleFeatureAdd_.bind(this),
    );
    this.features_.addEventListener(
      CollectionEventType.REMOVE,
      this.handleFeatureRemove_.bind(this),
    );

    /**
     * @type {import("../MapBrowserEvent.js").default}
     * @private
     */
    this.lastPointerEvent_ = null;

    /**
     * Delta (x, y in map units) between matched rtree vertex and pointer vertex.
     * @type {Array<number>}
     */
    this.delta_ = [0, 0];

    /**
     * @private
     */
    this.snapToPointer_ =
      options.snapToPointer === undefined
        ? !this.hitDetection_
        : options.snapToPointer;
  }