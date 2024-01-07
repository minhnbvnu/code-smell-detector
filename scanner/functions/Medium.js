constructor(attributes) {
    super(TEMPLATE_NS_ID, "medium");
    this.id = attributes.id || "";
    this.imagingBBox = (0, _utils.getBBox)(attributes.imagingBBox);
    this.long = (0, _utils.getMeasurement)(attributes.long);
    this.orientation = (0, _utils.getStringOption)(attributes.orientation, ["portrait", "landscape"]);
    this.short = (0, _utils.getMeasurement)(attributes.short);
    this.stock = attributes.stock || "";
    this.trayIn = (0, _utils.getStringOption)(attributes.trayIn, ["auto", "delegate", "pageFront"]);
    this.trayOut = (0, _utils.getStringOption)(attributes.trayOut, ["auto", "delegate"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }