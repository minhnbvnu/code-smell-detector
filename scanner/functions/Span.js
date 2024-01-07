constructor(attributes) {
    super(XHTML_NS_ID, "span");
    this.style = checkStyle(attributes.style);
  }