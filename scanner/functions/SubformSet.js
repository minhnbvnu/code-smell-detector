constructor(attributes) {
    super(TEMPLATE_NS_ID, "subformSet", true);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.relation = (0, _utils.getStringOption)(attributes.relation, ["ordered", "choice", "unordered"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.bookend = null;
    this.break = null;
    this.desc = null;
    this.extras = null;
    this.occur = null;
    this.overflow = null;
    this.breakAfter = new _xfa_object.XFAObjectArray();
    this.breakBefore = new _xfa_object.XFAObjectArray();
    this.subform = new _xfa_object.XFAObjectArray();
    this.subformSet = new _xfa_object.XFAObjectArray();
  }