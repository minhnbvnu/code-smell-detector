constructor(opts) {
    opts = opts || {};

    /** @type {string} */
    this.layout_ = opts.layout;
    this.isLittleEndian_ = opts.littleEndian !== false;

    this.isEWKB_ = opts.ewkb !== false;

    /** @type {Array<Array<number>>} */
    this.writeQueue_ = [];

    /**
     * @type {Object}
     * @property {number} X NoData value for X
     * @property {number} Y NoData value for Y
     * @property {number} Z NoData value for Z
     * @property {number} M NoData value for M
     */
    this.nodata_ = Object.assign({X: 0, Y: 0, Z: 0, M: 0}, opts.nodata);
  }