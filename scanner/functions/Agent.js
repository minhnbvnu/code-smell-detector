constructor(attributes) {
    super(CONFIG_NS_ID, "agent", true);
    this.name = attributes.name ? attributes.name.trim() : "";
    this.common = new _xfa_object.XFAObjectArray();
  }