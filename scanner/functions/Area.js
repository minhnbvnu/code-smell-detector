constructor(attributes) {
    super(CONFIG_NS_ID, "area");
    this.level = (0, _utils.getInteger)({
      data: attributes.level,
      defaultValue: 0,
      validator: n => n >= 1 && n <= 3
    });
    this.name = (0, _utils.getStringOption)(attributes.name, ["", "barcode", "coreinit", "deviceDriver", "font", "general", "layout", "merge", "script", "signature", "sourceSet", "templateCache"]);
  }