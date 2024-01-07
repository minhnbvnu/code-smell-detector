constructor(attributes) {
    super(LOCALE_SET_NS_ID, "dayNames", true);
    this.abbr = (0, _utils.getInteger)({
      data: attributes.abbr,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.day = new _xfa_object.XFAObjectArray(7);
  }