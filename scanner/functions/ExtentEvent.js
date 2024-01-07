constructor(extent) {
    super(ExtentEventType.EXTENTCHANGED);

    /**
     * The current extent.
     * @type {import("../extent.js").Extent}
     * @api
     */
    this.extent = extent;
  }