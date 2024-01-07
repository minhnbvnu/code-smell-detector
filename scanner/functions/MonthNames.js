constructor(attributes) {
    super(LOCALE_SET_NS_ID, "monthNames", true);
    this.abbr = (0, _utils.getInteger)({
      data: attributes.abbr,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.month = new _xfa_object.XFAObjectArray(12);
  }