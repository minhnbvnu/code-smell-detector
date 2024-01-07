constructor(options) {
    options = options ? options : {};

    const baseOptions = Object.assign(
      {
        updateWhileAnimating: true,
        updateWhileInteracting: true,
        renderBuffer: 0,
      },
      options,
    );

    delete baseOptions.maxLines;
    delete baseOptions.strokeStyle;
    delete baseOptions.targetSize;
    delete baseOptions.showLabels;
    delete baseOptions.lonLabelFormatter;
    delete baseOptions.latLabelFormatter;
    delete baseOptions.lonLabelPosition;
    delete baseOptions.latLabelPosition;
    delete baseOptions.lonLabelStyle;
    delete baseOptions.latLabelStyle;
    delete baseOptions.intervals;
    super(baseOptions);

    /**
     * @type {import("../proj/Projection.js").default}
     */
    this.projection_ = null;

    /**
     * @type {number}
     * @private
     */
    this.maxLat_ = Infinity;

    /**
     * @type {number}
     * @private
     */
    this.maxLon_ = Infinity;

    /**
     * @type {number}
     * @private
     */
    this.minLat_ = -Infinity;

    /**
     * @type {number}
     * @private
     */
    this.minLon_ = -Infinity;

    /**
     * @type {number}
     * @private
     */
    this.maxX_ = Infinity;

    /**
     * @type {number}
     * @private
     */
    this.maxY_ = Infinity;

    /**
     * @type {number}
     * @private
     */
    this.minX_ = -Infinity;

    /**
     * @type {number}
     * @private
     */
    this.minY_ = -Infinity;

    /**
     * @type {number}
     * @private
     */
    this.targetSize_ =
      options.targetSize !== undefined ? options.targetSize : 100;

    /**
     * @type {number}
     * @private
     */
    this.maxLines_ = options.maxLines !== undefined ? options.maxLines : 100;

    /**
     * @type {Array<LineString>}
     * @private
     */
    this.meridians_ = [];

    /**
     * @type {Array<LineString>}
     * @private
     */
    this.parallels_ = [];

    /**
     * @type {Stroke}
     * @private
     */
    this.strokeStyle_ =
      options.strokeStyle !== undefined
        ? options.strokeStyle
        : DEFAULT_STROKE_STYLE;

    /**
     * @type {import("../proj.js").TransformFunction|undefined}
     * @private
     */
    this.fromLonLatTransform_ = undefined;

    /**
     * @type {import("../proj.js").TransformFunction|undefined}
     * @private
     */
    this.toLonLatTransform_ = undefined;

    /**
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    this.projectionCenterLonLat_ = null;

    /**
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    this.bottomLeft_ = null;

    /**
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    this.bottomRight_ = null;

    /**
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    this.topLeft_ = null;

    /**
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    this.topRight_ = null;

    /**
     * @type {Array<GraticuleLabelDataType>}
     * @private
     */
    this.meridiansLabels_ = null;

    /**
     * @type {Array<GraticuleLabelDataType>}
     * @private
     */
    this.parallelsLabels_ = null;

    if (options.showLabels) {
      /**
       * @type {null|function(number):string}
       * @private
       */
      this.lonLabelFormatter_ =
        options.lonLabelFormatter == undefined
          ? degreesToStringHDMS.bind(this, 'EW')
          : options.lonLabelFormatter;

      /**
       * @type {function(number):string}
       * @private
       */
      this.latLabelFormatter_ =
        options.latLabelFormatter == undefined
          ? degreesToStringHDMS.bind(this, 'NS')
          : options.latLabelFormatter;

      /**
       * Longitude label position in fractions (0..1) of view extent. 0 means
       * bottom, 1 means top.
       * @type {number}
       * @private
       */
      this.lonLabelPosition_ =
        options.lonLabelPosition == undefined ? 0 : options.lonLabelPosition;

      /**
       * Latitude Label position in fractions (0..1) of view extent. 0 means left, 1
       * means right.
       * @type {number}
       * @private
       */
      this.latLabelPosition_ =
        options.latLabelPosition == undefined ? 1 : options.latLabelPosition;

      /**
       * @type {Style}
       * @private
       */
      this.lonLabelStyleBase_ = new Style({
        text:
          options.lonLabelStyle !== undefined
            ? options.lonLabelStyle.clone()
            : new Text({
                font: '12px Calibri,sans-serif',
                textBaseline: 'bottom',
                fill: new Fill({
                  color: 'rgba(0,0,0,1)',
                }),
                stroke: new Stroke({
                  color: 'rgba(255,255,255,1)',
                  width: 3,
                }),
              }),
      });

      /**
       * @private
       * @param {import("../Feature").default} feature Feature
       * @return {Style} style
       */
      this.lonLabelStyle_ = (feature) => {
        const label = feature.get('graticule_label');
        this.lonLabelStyleBase_.getText().setText(label);
        return this.lonLabelStyleBase_;
      };

      /**
       * @type {Style}
       * @private
       */
      this.latLabelStyleBase_ = new Style({
        text:
          options.latLabelStyle !== undefined
            ? options.latLabelStyle.clone()
            : new Text({
                font: '12px Calibri,sans-serif',
                textAlign: 'right',
                fill: new Fill({
                  color: 'rgba(0,0,0,1)',
                }),
                stroke: new Stroke({
                  color: 'rgba(255,255,255,1)',
                  width: 3,
                }),
              }),
      });

      /**
       * @private
       * @param {import("../Feature").default} feature Feature
       * @return {Style} style
       */
      this.latLabelStyle_ = (feature) => {
        const label = feature.get('graticule_label');
        this.latLabelStyleBase_.getText().setText(label);
        return this.latLabelStyleBase_;
      };

      this.meridiansLabels_ = [];
      this.parallelsLabels_ = [];

      this.addEventListener(EventType.POSTRENDER, this.drawLabels_.bind(this));
    }

    /**
     * @type {Array<number>}
     * @private
     */
    this.intervals_ =
      options.intervals !== undefined ? options.intervals : INTERVALS;

    // use a source with a custom loader for lines & text
    this.setSource(
      new VectorSource({
        loader: this.loaderFunction.bind(this),
        strategy: this.strategyFunction.bind(this),
        features: new Collection(),
        overlaps: false,
        useSpatialIndex: false,
        wrapX: options.wrapX,
      }),
    );

    /**
     * feature pool to use when updating graticule
     * @type {Array<Feature>}
     * @private
     */
    this.featurePool_ = [];

    /**
     * @type {Style}
     * @private
     */
    this.lineStyle_ = new Style({
      stroke: this.strokeStyle_,
    });

    /**
     * @type {?import("../extent.js").Extent}
     * @private
     */
    this.loadedExtent_ = null;

    /**
     * @type {?import("../extent.js").Extent}
     * @private
     */
    this.renderedExtent_ = null;

    /**
     * @type {?number}
     * @private
     */
    this.renderedResolution_ = null;

    this.setRenderOrder(null);
  }