constructor(attributes) {
    super(XHTML_NS_ID, "li");
    this.style = checkStyle(attributes.style);
  }