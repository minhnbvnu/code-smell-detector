constructor(attributes) {
    super(CONFIG_NS_ID, "VersionControl");
    this.outputBelow = (0, _utils.getStringOption)(attributes.outputBelow, ["warn", "error", "update"]);
    this.sourceAbove = (0, _utils.getStringOption)(attributes.sourceAbove, ["warn", "error"]);
    this.sourceBelow = (0, _utils.getStringOption)(attributes.sourceBelow, ["update", "maintain"]);
  }