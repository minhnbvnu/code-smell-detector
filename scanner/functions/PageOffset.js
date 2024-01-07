constructor(attributes) {
    super(CONFIG_NS_ID, "pageOffset");
    this.x = (0, _utils.getInteger)({
      data: attributes.x,
      defaultValue: "useXDCSetting",
      validator: n => true
    });
    this.y = (0, _utils.getInteger)({
      data: attributes.y,
      defaultValue: "useXDCSetting",
      validator: n => true
    });
  }