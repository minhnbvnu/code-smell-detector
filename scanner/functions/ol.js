constructor(attributes) {
    super(XHTML_NS_ID, "ol");
    this.style = checkStyle(attributes.style);
  }