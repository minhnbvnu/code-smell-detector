constructor(attributes) {
    super(CONNECTION_SET_NS_ID, "xmlConnection", true);
    this.dataDescription = attributes.dataDescription || "";
    this.name = attributes.name || "";
    this.uri = null;
  }