constructor(attributes) {
    super(TEMPLATE_NS_ID, "font", true);
    this.baselineShift = (0, _utils.getMeasurement)(attributes.baselineShift);
    this.fontHorizontalScale = (0, _utils.getFloat)({
      data: attributes.fontHorizontalScale,
      defaultValue: 100,
      validate: x => x >= 0
    });
    this.fontVerticalScale = (0, _utils.getFloat)({
      data: attributes.fontVerticalScale,
      defaultValue: 100,
      validate: x => x >= 0
    });
    this.id = attributes.id || "";
    this.kerningMode = (0, _utils.getStringOption)(attributes.kerningMode, ["none", "pair"]);
    this.letterSpacing = (0, _utils.getMeasurement)(attributes.letterSpacing, "0");
    this.lineThrough = (0, _utils.getInteger)({
      data: attributes.lineThrough,
      defaultValue: 0,
      validate: x => x === 1 || x === 2
    });
    this.lineThroughPeriod = (0, _utils.getStringOption)(attributes.lineThroughPeriod, ["all", "word"]);
    this.overline = (0, _utils.getInteger)({
      data: attributes.overline,
      defaultValue: 0,
      validate: x => x === 1 || x === 2
    });
    this.overlinePeriod = (0, _utils.getStringOption)(attributes.overlinePeriod, ["all", "word"]);
    this.posture = (0, _utils.getStringOption)(attributes.posture, ["normal", "italic"]);
    this.size = (0, _utils.getMeasurement)(attributes.size, "10pt");
    this.typeface = attributes.typeface || "";
    this.underline = (0, _utils.getInteger)({
      data: attributes.underline,
      defaultValue: 0,
      validate: x => x === 1 || x === 2
    });
    this.underlinePeriod = (0, _utils.getStringOption)(attributes.underlinePeriod, ["all", "word"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.weight = (0, _utils.getStringOption)(attributes.weight, ["normal", "bold"]);
    this.extras = null;
    this.fill = null;
  }