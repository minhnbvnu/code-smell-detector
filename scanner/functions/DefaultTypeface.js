constructor(attributes) {
    super(CONFIG_NS_ID, "defaultTypeface");
    this.writingScript = (0, _utils.getStringOption)(attributes.writingScript, ["*", "Arabic", "Cyrillic", "EastEuropeanRoman", "Greek", "Hebrew", "Japanese", "Korean", "Roman", "SimplifiedChinese", "Thai", "TraditionalChinese", "Vietnamese"]);
  }