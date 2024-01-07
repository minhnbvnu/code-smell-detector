constructor(error) {
    super(GeolocationErrorType.ERROR);

    /**
     * Code of the underlying `GeolocationPositionError`.
     * @type {number}
     * @api
     */
    this.code = error.code;

    /**
     * Message of the underlying `GeolocationPositionError`.
     * @type {string}
     * @api
     */
    this.message = error.message;
  }