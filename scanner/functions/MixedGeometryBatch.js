constructor() {
    this.globalCounter_ = 0;
    /**
     * Refs are used as keys for hit detection.
     * @type {Map<number, Feature|RenderFeature>}
     * @private
     */
    this.refToFeature_ = new Map();

    /**
     * Features are split in "entries", which are individual geometries. We use the following map to share a single ref for all those entries.
     * @type {Map<string, number>}
     * @private
     */
    this.uidToRef_ = new Map();

    /**
     * The precision in WebGL shaders is limited.
     * To keep the refs as small as possible we maintain an array of returned references.
     * @type {Array<number>}
     * @private
     */
    this.freeGlobalRef_ = [];

    /**
     * @type {PolygonGeometryBatch}
     */
    this.polygonBatch = {
      entries: {},
      geometriesCount: 0,
      verticesCount: 0,
      ringsCount: 0,
    };

    /**
     * @type {PointGeometryBatch}
     */
    this.pointBatch = {
      entries: {},
      geometriesCount: 0,
    };

    /**
     * @type {LineStringGeometryBatch}
     */
    this.lineStringBatch = {
      entries: {},
      geometriesCount: 0,
      verticesCount: 0,
    };
  }