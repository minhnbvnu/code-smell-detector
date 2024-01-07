constructor(attributes) {
    super(TEMPLATE_NS_ID, "issuers", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.certificate = new _xfa_object.XFAObjectArray();
  }