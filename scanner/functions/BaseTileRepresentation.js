constructor(options) {
    super();

    /**
     * @type {TileType}
     */
    this.tile;
    this.handleTileChange_ = this.handleTileChange_.bind(this);

    /**
     * @type {number}
     * @protected
     */
    this.gutter_ = options.gutter || 0;

    /**
     * @type {import("../webgl/Helper.js").default}
     * @protected
     */
    this.helper_ = options.helper;

    this.loaded = false;
    this.ready = false;
  }