constructor(options) {
    options = options ? options : {};

    const baseOptions = Object.assign({}, options);

    delete baseOptions.preload;
    delete baseOptions.useInterimTilesOnError;
    super(baseOptions);

    /***
     * @type {BaseTileLayerOnSignature<import("../events").EventsKey>}
     */
    this.on;

    /***
     * @type {BaseTileLayerOnSignature<import("../events").EventsKey>}
     */
    this.once;

    /***
     * @type {BaseTileLayerOnSignature<void>}
     */
    this.un;

    this.setPreload(options.preload !== undefined ? options.preload : 0);
    this.setUseInterimTilesOnError(
      options.useInterimTilesOnError !== undefined
        ? options.useInterimTilesOnError
        : true,
    );
  }