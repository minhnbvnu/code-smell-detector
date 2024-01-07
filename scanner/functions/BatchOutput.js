constructor(attributes) {
    super(CONFIG_NS_ID, "batchOutput");
    this.format = (0, _utils.getStringOption)(attributes.format, ["none", "concat", "zip", "zipCompress"]);
  }