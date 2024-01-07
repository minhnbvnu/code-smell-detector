constructor(attributes) {
    super(TEMPLATE_NS_ID, "margin", true);
    this.bottomInset = (0, _utils.getMeasurement)(attributes.bottomInset, "0");
    this.id = attributes.id || "";
    this.leftInset = (0, _utils.getMeasurement)(attributes.leftInset, "0");
    this.rightInset = (0, _utils.getMeasurement)(attributes.rightInset, "0");
    this.topInset = (0, _utils.getMeasurement)(attributes.topInset, "0");
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
  }