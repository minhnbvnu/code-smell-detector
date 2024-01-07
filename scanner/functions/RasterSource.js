constructor(options) {
    super({
      projection: null,
    });

    /***
     * @type {RasterSourceOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {RasterSourceOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {RasterSourceOnSignature<void>}
     */
    this.un;

    /**
     * @private
     * @type {Processor}
     */
    this.processor_ = null;

    /**
     * @private
     * @type {RasterOperationType}
     */
    this.operationType_ =
      options.operationType !== undefined ? options.operationType : 'pixel';

    /**
     * @private
     * @type {number}
     */
    this.threads_ = options.threads !== undefined ? options.threads : 1;

    /**
     * @private
     * @type {Array<import("../layer/Layer.js").default>}
     */
    this.layers_ = createLayers(options.sources);

    const changed = this.changed.bind(this);
    for (let i = 0, ii = this.layers_.length; i < ii; ++i) {
      this.layers_[i].addEventListener(EventType.CHANGE, changed);
    }

    /** @type {boolean} */
    this.useResolutions_ = options.resolutions !== null;

    /**
     * @private
     * @type {import("../TileQueue.js").default}
     */
    this.tileQueue_ = new TileQueue(function () {
      return 1;
    }, this.processSources_.bind(this));

    /**
     * The most recently requested frame state.
     * @type {import("../Map.js").FrameState}
     * @private
     */
    this.requestedFrameState_;

    /**
     * The most recently rendered image canvas.
     * @type {import("../ImageCanvas.js").default}
     * @private
     */
    this.renderedImageCanvas_ = null;

    /**
     * The most recently rendered revision.
     * @type {number}
     */
    this.renderedRevision_;

    /**
     * @private
     * @type {import("../Map.js").FrameState}
     */
    this.frameState_ = {
      animate: false,
      coordinateToPixelTransform: createTransform(),
      declutterTree: null,
      extent: null,
      index: 0,
      layerIndex: 0,
      layerStatesArray: getLayerStatesArray(this.layers_),
      pixelRatio: 1,
      pixelToCoordinateTransform: createTransform(),
      postRenderFunctions: [],
      size: [0, 0],
      tileQueue: this.tileQueue_,
      time: Date.now(),
      usedTiles: {},
      viewState: /** @type {import("../View.js").State} */ ({
        rotation: 0,
      }),
      viewHints: [],
      wantedTiles: {},
      mapId: getUid(this),
      renderTargets: {},
    };

    this.setAttributions(function (frameState) {
      const attributions = [];
      for (
        let index = 0, iMax = options.sources.length;
        index < iMax;
        ++index
      ) {
        const sourceOrLayer = options.sources[index];
        const source =
          sourceOrLayer instanceof Source
            ? sourceOrLayer
            : sourceOrLayer.getSource();
        if (!source) {
          continue;
        }
        const attributionGetter = source.getAttributions();
        if (typeof attributionGetter === 'function') {
          const sourceAttribution = attributionGetter(frameState);
          attributions.push.apply(attributions, sourceAttribution);
        }
      }
      return attributions.length !== 0 ? attributions : null;
    });

    if (options.operation !== undefined) {
      this.setOperation(options.operation, options.lib);
    }
  }