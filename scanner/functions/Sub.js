constructor(attributes) {
    super(XHTML_NS_ID, "sub");
    this.style = checkStyle(attributes.style);
  }