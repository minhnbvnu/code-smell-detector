constructor(type, features, coordinate, startCoordinate, mapBrowserEvent) {
    super(type);

    /**
     * The features being translated.
     * @type {Collection<Feature>}
     * @api
     */
    this.features = features;

    /**
     * The coordinate of the drag event.
     * @const
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */
    this.coordinate = coordinate;

    /**
     * The coordinate of the start position before translation started.
     * @const
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */
    this.startCoordinate = startCoordinate;

    /**
     * Associated {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */
    this.mapBrowserEvent = mapBrowserEvent;
  }