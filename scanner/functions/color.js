constructor(attributes) {
    super(TEMPLATE_NS_ID, "color", true);
    this.cSpace = (0, _utils.getStringOption)(attributes.cSpace, ["SRGB"]);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.value = (0, _utils.getColor)(attributes.value);
    this.extras = null;
  }