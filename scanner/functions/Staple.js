constructor(attributes) {
    super(CONFIG_NS_ID, "staple");
    this.mode = (0, _utils.getStringOption)(attributes.mode, ["usePrinterSetting", "on", "off"]);
  }