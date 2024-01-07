constructor(options) {
    options = options ? options : {};

    const baseOptions = Object.assign({}, options);
    delete baseOptions.imageRatio;
    super(baseOptions);

    /**
     * @type {number}
     * @private
     */
    this.imageRatio_ =
      options.imageRatio !== undefined ? options.imageRatio : 1;
  }