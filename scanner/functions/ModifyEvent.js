constructor(type, features, mapBrowserEvent) {
    super(type);

    /**
     * The features being modified.
     * @type {Collection<Feature>}
     * @api
     */
    this.features = features;

    /**
     * Associated {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */
    this.mapBrowserEvent = mapBrowserEvent;
  }