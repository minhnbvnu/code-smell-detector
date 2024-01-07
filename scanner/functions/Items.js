constructor(attributes) {
    super(TEMPLATE_NS_ID, "items", true);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.ref = attributes.ref || "";
    this.save = (0, _utils.getInteger)({
      data: attributes.save,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.boolean = new _xfa_object.XFAObjectArray();
    this.date = new _xfa_object.XFAObjectArray();
    this.dateTime = new _xfa_object.XFAObjectArray();
    this.decimal = new _xfa_object.XFAObjectArray();
    this.exData = new _xfa_object.XFAObjectArray();
    this.float = new _xfa_object.XFAObjectArray();
    this.image = new _xfa_object.XFAObjectArray();
    this.integer = new _xfa_object.XFAObjectArray();
    this.text = new _xfa_object.XFAObjectArray();
    this.time = new _xfa_object.XFAObjectArray();
  }