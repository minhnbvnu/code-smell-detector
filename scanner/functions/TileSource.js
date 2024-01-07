constructor(options) {
    super({
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      projection: options.projection,
      state: options.state,
      wrapX: options.wrapX,
      interpolate: options.interpolate,
    });

    /***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {TileSourceOnSignature<void>}
     */
    this.un;

    /**
     * @private
     * @type {boolean}
     */
    this.opaque_ = options.opaque !== undefined ? options.opaque : false;

    /**
     * @private
     * @type {number}
     */
    this.tilePixelRatio_ =
      options.tilePixelRatio !== undefined ? options.tilePixelRatio : 1;

    /**
     * @type {import("../tilegrid/TileGrid.js").default|null}
     */
    this.tileGrid = options.tileGrid !== undefined ? options.tileGrid : null;

    const tileSize = [256, 256];
    if (this.tileGrid) {
      toSize(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), tileSize);
    }

    /**
     * @protected
     * @type {import("../TileCache.js").default}
     */
    this.tileCache = new TileCache(options.cacheSize || 0);

    /**
     * @protected
     * @type {import("../size.js").Size}
     */
    this.tmpSize = [0, 0];

    /**
     * @private
     * @type {string}
     */
    this.key_ = options.key || '';

    /**
     * @protected
     * @type {import("../Tile.js").Options}
     */
    this.tileOptions = {
      transition: options.transition,
      interpolate: options.interpolate,
    };

    /**
     * zDirection hint, read by the renderer. Indicates which resolution should be used
     * by a renderer if the views resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     * @type {number|import("../array.js").NearestDirectionFunction}
     */
    this.zDirection = options.zDirection ? options.zDirection : 0;
  }