constructor(options) {
    super(options);

    /**
     * @type {Array<WebGLTexture>}
     */
    this.textures = [];

    /**
     * @type {import("../size.js").Size}
     * @private
     */
    this.renderSize_ = toSize(
      options.grid.getTileSize(options.tile.tileCoord[0]),
    );

    /**
     * @type {number}
     */
    this.bandCount = NaN;

    const coords = new WebGLArrayBuffer(ARRAY_BUFFER, STATIC_DRAW);
    coords.fromArray([
      0, // P0
      1,
      1, // P1
      1,
      1, // P2
      0,
      0, // P3
      0,
    ]);
    this.helper_.flushBufferData(coords);

    /**
     * @type {WebGLArrayBuffer}
     */
    this.coords = coords;

    this.setTile(options.tile);
  }