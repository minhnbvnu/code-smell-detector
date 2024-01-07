constructor(attributes) {
    super(TEMPLATE_NS_ID, "contentArea", true);
    this.h = (0, _utils.getMeasurement)(attributes.h);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.w = (0, _utils.getMeasurement)(attributes.w);
    this.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    this.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    this.desc = null;
    this.extras = null;
  }