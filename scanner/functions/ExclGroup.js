constructor(attributes) {
    super(TEMPLATE_NS_ID, "exclGroup", true);
    this.access = (0, _utils.getStringOption)(attributes.access, ["open", "nonInteractive", "protected", "readOnly"]);
    this.accessKey = attributes.accessKey || "";
    this.anchorType = (0, _utils.getStringOption)(attributes.anchorType, ["topLeft", "bottomCenter", "bottomLeft", "bottomRight", "middleCenter", "middleLeft", "middleRight", "topCenter", "topRight"]);
    this.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: x => x >= 1
    });
    this.h = attributes.h ? (0, _utils.getMeasurement)(attributes.h) : "";
    this.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    this.id = attributes.id || "";
    this.layout = (0, _utils.getStringOption)(attributes.layout, ["position", "lr-tb", "rl-row", "rl-tb", "row", "table", "tb"]);
    this.maxH = (0, _utils.getMeasurement)(attributes.maxH, "0pt");
    this.maxW = (0, _utils.getMeasurement)(attributes.maxW, "0pt");
    this.minH = (0, _utils.getMeasurement)(attributes.minH, "0pt");
    this.minW = (0, _utils.getMeasurement)(attributes.minW, "0pt");
    this.name = attributes.name || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.w = attributes.w ? (0, _utils.getMeasurement)(attributes.w) : "";
    this.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    this.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    this.assist = null;
    this.bind = null;
    this.border = null;
    this.calculate = null;
    this.caption = null;
    this.desc = null;
    this.extras = null;
    this.margin = null;
    this.para = null;
    this.traversal = null;
    this.validate = null;
    this.connect = new _xfa_object.XFAObjectArray();
    this.event = new _xfa_object.XFAObjectArray();
    this.field = new _xfa_object.XFAObjectArray();
    this.setProperty = new _xfa_object.XFAObjectArray();
  }