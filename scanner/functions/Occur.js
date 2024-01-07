constructor(attributes) {
    super(TEMPLATE_NS_ID, "occur", true);
    this.id = attributes.id || "";
    this.initial = (0, _utils.getInteger)({
      data: attributes.initial,
      defaultValue: 1,
      validate: x => true
    });
    this.max = (0, _utils.getInteger)({
      data: attributes.max,
      defaultValue: 1,
      validate: x => true
    });
    this.min = (0, _utils.getInteger)({
      data: attributes.min,
      defaultValue: 1,
      validate: x => true
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
  }