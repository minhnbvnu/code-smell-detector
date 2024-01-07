constructor(attributes) {
    super(CONFIG_NS_ID, "driver", true);
    this.name = attributes.name ? attributes.name.trim() : "";
    this.fontInfo = null;
    this.xdc = null;
  }