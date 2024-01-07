constructor(attributes) {
    super(TEMPLATE_NS_ID, "imageEdit", true);
    this.data = (0, _utils.getStringOption)(attributes.data, ["link", "embed"]);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.border = null;
    this.extras = null;
    this.margin = null;
  }