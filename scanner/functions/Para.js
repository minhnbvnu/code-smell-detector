constructor(attributes) {
    super(TEMPLATE_NS_ID, "para", true);
    this.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    this.id = attributes.id || "";
    this.lineHeight = (0, _utils.getMeasurement)(attributes.lineHeight, "0pt");
    this.marginLeft = (0, _utils.getMeasurement)(attributes.marginLeft, "0");
    this.marginRight = (0, _utils.getMeasurement)(attributes.marginRight, "0");
    this.orphans = (0, _utils.getInteger)({
      data: attributes.orphans,
      defaultValue: 0,
      validate: x => x >= 0
    });
    this.preserve = attributes.preserve || "";
    this.radixOffset = (0, _utils.getMeasurement)(attributes.radixOffset, "0");
    this.spaceAbove = (0, _utils.getMeasurement)(attributes.spaceAbove, "0");
    this.spaceBelow = (0, _utils.getMeasurement)(attributes.spaceBelow, "0");
    this.tabDefault = attributes.tabDefault ? (0, _utils.getMeasurement)(this.tabDefault) : null;
    this.tabStops = (attributes.tabStops || "").trim().split(/\s+/).map((x, i) => i % 2 === 1 ? (0, _utils.getMeasurement)(x) : x);
    this.textIndent = (0, _utils.getMeasurement)(attributes.textIndent, "0");
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.vAlign = (0, _utils.getStringOption)(attributes.vAlign, ["top", "bottom", "middle"]);
    this.widows = (0, _utils.getInteger)({
      data: attributes.widows,
      defaultValue: 0,
      validate: x => x >= 0
    });
    this.hyphenation = null;
  }