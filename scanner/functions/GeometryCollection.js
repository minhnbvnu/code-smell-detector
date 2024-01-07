constructor(geometries) {
    super();

    /**
     * @private
     * @type {Array<Geometry>}
     */
    this.geometries_ = geometries;

    /**
     * @type {Array<import("../events.js").EventsKey>}
     */
    this.changeEventsKeys_ = [];

    this.listenGeometriesChange_();
  }