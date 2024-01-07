constructor(options) {
    super();

    options = options ? options : {};

    /**
     * @private
     * @type {string}
     */
    this.featureNS_ = 'http://mapserver.gis.umn.edu/mapserver';

    /**
     * @private
     * @type {GML2}
     */
    this.gmlFormat_ = new GML2();

    /**
     * @private
     * @type {Array<string>|null}
     */
    this.layers_ = options.layers ? options.layers : null;
  }