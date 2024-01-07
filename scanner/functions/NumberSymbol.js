constructor(attributes) {
    super(LOCALE_SET_NS_ID, "numberSymbol");
    this.name = (0, _utils.getStringOption)(attributes.name, ["decimal", "grouping", "percent", "minus", "zero"]);
  }