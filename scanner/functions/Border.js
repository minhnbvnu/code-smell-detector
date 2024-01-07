constructor(attributes) {
    super(TEMPLATE_NS_ID, "border", true);
    this.break = (0, _utils.getStringOption)(attributes.break, ["close", "open"]);
    this.hand = (0, _utils.getStringOption)(attributes.hand, ["even", "left", "right"]);
    this.id = attributes.id || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.corner = new _xfa_object.XFAObjectArray(4);
    this.edge = new _xfa_object.XFAObjectArray(4);
    this.extras = null;
    this.fill = null;
    this.margin = null;
  }