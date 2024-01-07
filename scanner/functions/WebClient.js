constructor(attributes) {
    super(CONFIG_NS_ID, "webClient", true);
    this.name = attributes.name ? attributes.name.trim() : "";
    this.fontInfo = null;
    this.xdc = null;
  }