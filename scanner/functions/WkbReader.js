constructor(view) {
    /** @private */
    this.view_ = view;

    /**
     * @type {number}
     * @private
     */
    this.pos_ = 0;

    /**
     * @type {boolean}
     * @private
     */
    this.initialized_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.isLittleEndian_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.hasZ_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.hasM_ = false;

    /**
     * @type {number|null}
     * @private
     */
    this.srid_ = null;

    /**
     * @type {import("../geom/Geometry.js").GeometryLayout}
     * @private
     */
    this.layout_ = 'XY';
  }