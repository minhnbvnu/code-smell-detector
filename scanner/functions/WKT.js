constructor(options) {
    super();

    options = options ? options : {};

    /**
     * Split GeometryCollection into multiple features.
     * @type {boolean}
     * @private
     */
    this.splitCollection_ =
      options.splitCollection !== undefined ? options.splitCollection : false;
  }