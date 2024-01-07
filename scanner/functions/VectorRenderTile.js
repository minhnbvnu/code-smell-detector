constructor(tileCoord, state, urlTileCoord, getSourceTiles) {
    super(tileCoord, state, {transition: 0});

    /**
     * @private
     * @type {!Object<string, CanvasRenderingContext2D>}
     */
    this.context_ = {};

    /**
     * Executor groups by layer uid. Entries are read/written by the renderer.
     * @type {Object<string, Array<import("./render/canvas/ExecutorGroup.js").default>>}
     */
    this.executorGroups = {};

    /**
     * Executor groups for decluttering, by layer uid. Entries are read/written by the renderer.
     * @type {Object<string, Array<import("./render/canvas/ExecutorGroup.js").default>>}
     */
    this.declutterExecutorGroups = {};

    /**
     * Number of loading source tiles. Read/written by the source.
     * @type {number}
     */
    this.loadingSourceTiles = 0;

    /**
     * @type {Object<number, ImageData>}
     */
    this.hitDetectionImageData = {};

    /**
     * @private
     * @type {!Object<string, ReplayState>}
     */
    this.replayState_ = {};

    /**
     * @type {Array<import("./VectorTile.js").default>}
     */
    this.sourceTiles = [];

    /**
     * @type {Object<string, boolean>}
     */
    this.errorTileKeys = {};

    /**
     * @type {number}
     */
    this.wantedResolution;

    /**
     * @type {!function():Array<import("./VectorTile.js").default>}
     */
    this.getSourceTiles = getSourceTiles.bind(undefined, this);

    /**
     * @type {import("./tilecoord.js").TileCoord}
     */
    this.wrappedTileCoord = urlTileCoord;
  }