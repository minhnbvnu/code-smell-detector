constructor(tagName, geometryName, geometry, srsName) {
    super(tagName);

    /**
     * @type {!string}
     */
    this.geometryName = geometryName || 'the_geom';

    /**
     * @type {import("../../geom/Geometry.js").default}
     */
    this.geometry = geometry;

    /**
     * @type {string|undefined}
     */
    this.srsName = srsName;
  }