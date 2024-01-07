constructor(attributes) {
    super(CONNECTION_SET_NS_ID, "xsdConnection", true);
    this.dataDescription = attributes.dataDescription || "";
    this.name = attributes.name || "";
    this.rootElement = null;
    this.uri = null;
  }