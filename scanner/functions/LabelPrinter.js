constructor(attributes) {
    super(CONFIG_NS_ID, "labelPrinter", true);
    this.name = (0, _utils.getStringOption)(attributes.name, ["zpl", "dpl", "ipl", "tcpl"]);
    this.batchOutput = null;
    this.flipLabel = null;
    this.fontInfo = null;
    this.xdc = null;
  }