constructor(attributes) {
    super(TEMPLATE_NS_ID, "manifest", true);
    this.action = (0, _utils.getStringOption)(attributes.action, ["include", "all", "exclude"]);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.ref = new _xfa_object.XFAObjectArray();
  }