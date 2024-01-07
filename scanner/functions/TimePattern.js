constructor(attributes) {
    super(LOCALE_SET_NS_ID, "timePattern");
    this.name = (0, _utils.getStringOption)(attributes.name, ["full", "long", "med", "short"]);
  }