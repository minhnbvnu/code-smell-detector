constructor(attributes) {
    super(LOCALE_SET_NS_ID, "currencySymbol");
    this.name = (0, _utils.getStringOption)(attributes.name, ["symbol", "isoname", "decimal"]);
  }