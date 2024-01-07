constructor(geometryOrProperties) {
    super();

    /***
     * @type {FeatureOnSignature<import("./events").EventsKey>}
     */
    this.on;

    /***
     * @type {FeatureOnSignature<import("./events").EventsKey>}
     */
    this.once;

    /***
     * @type {FeatureOnSignature<void>}
     */
    this.un;

    /**
     * @private
     * @type {number|string|undefined}
     */
    this.id_ = undefined;

    /**
     * @type {string}
     * @private
     */
    this.geometryName_ = 'geometry';

    /**
     * User provided style.
     * @private
     * @type {import("./style/Style.js").StyleLike}
     */
    this.style_ = null;

    /**
     * @private
     * @type {import("./style/Style.js").StyleFunction|undefined}
     */
    this.styleFunction_ = undefined;

    /**
     * @private
     * @type {?import("./events.js").EventsKey}
     */
    this.geometryChangeKey_ = null;

    this.addChangeListener(this.geometryName_, this.handleGeometryChanged_);

    if (geometryOrProperties) {
      if (
        typeof (
          /** @type {?} */ (geometryOrProperties).getSimplifiedGeometry
        ) === 'function'
      ) {
        const geometry = /** @type {Geometry} */ (geometryOrProperties);
        this.setGeometry(geometry);
      } else {
        /** @type {Object<string, *>} */
        const properties = geometryOrProperties;
        this.setProperties(properties);
      }
    }
  }