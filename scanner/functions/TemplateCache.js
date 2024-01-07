constructor(attributes) {
    super(CONFIG_NS_ID, "templateCache");
    this.maxEntries = (0, _utils.getInteger)({
      data: attributes.maxEntries,
      defaultValue: 5,
      validator: n => n >= 0
    });
  }