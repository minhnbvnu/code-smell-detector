constructor(attributes) {
    super(XHTML_NS_ID, "ul");
    this.style = checkStyle(attributes.style);
  }