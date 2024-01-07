constructor(options) {
    super({
      projection: getProjection('EPSG:3857'),
      state: 'loading',
      zDirection: options.zDirection,
    });

    /**
     * @private
     * @type {boolean}
     */
    this.preemptive_ =
      options.preemptive !== undefined ? options.preemptive : true;

    /**
     * @private
     * @type {!import("../Tile.js").UrlFunction}
     */
    this.tileUrlFunction_ = nullTileUrlFunction;

    /**
     * @private
     * @type {string|undefined}
     */
    this.template_ = undefined;

    /**
     * @private
     * @type {boolean}
     */
    this.jsonp_ = options.jsonp || false;

    if (options.url) {
      if (this.jsonp_) {
        requestJSONP(
          options.url,
          this.handleTileJSONResponse.bind(this),
          this.handleTileJSONError.bind(this),
        );
      } else {
        const client = new XMLHttpRequest();
        client.addEventListener('load', this.onXHRLoad_.bind(this));
        client.addEventListener('error', this.onXHRError_.bind(this));
        client.open('GET', options.url);
        client.send();
      }
    } else if (options.tileJSON) {
      this.handleTileJSONResponse(options.tileJSON);
    } else {
      throw new Error('Either `url` or `tileJSON` options must be provided');
    }
  }