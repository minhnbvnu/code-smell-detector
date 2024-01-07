constructor(attributes) {
    super(XHTML_NS_ID, "body");
    this.style = checkStyle(attributes.style);
  }