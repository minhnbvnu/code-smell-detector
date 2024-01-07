constructor(attributes) {
    super(XHTML_NS_ID, "html");
    this.style = checkStyle(attributes.style);
  }