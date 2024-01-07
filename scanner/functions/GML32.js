constructor(options) {
    options = options ? options : {};

    super(options);

    /**
     * @type {string}
     */
    this.schemaLocation = options.schemaLocation
      ? options.schemaLocation
      : this.namespace + ' http://schemas.opengis.net/gml/3.2.1/gml.xsd';
  }