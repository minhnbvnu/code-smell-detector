constructor(attributes) {
    super(CONFIG_NS_ID, "equateRange");
    this.from = attributes.from || "";
    this.to = attributes.to || "";
    this._unicodeRange = attributes.unicodeRange || "";
  }