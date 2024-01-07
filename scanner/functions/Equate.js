constructor(attributes) {
    super(CONFIG_NS_ID, "equate");
    this.force = (0, _utils.getInteger)({
      data: attributes.force,
      defaultValue: 1,
      validator: n => n === 0
    });
    this.from = attributes.from || "";
    this.to = attributes.to || "";
  }