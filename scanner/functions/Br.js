constructor(attributes) {
    super(XHTML_NS_ID, "br");
    this.style = checkStyle(attributes.style);
  }