constructor(attributes) {
    super(TEMPLATE_NS_ID, "keyUsage");
    const options = ["", "yes", "no"];
    this.crlSign = (0, _utils.getStringOption)(attributes.crlSign, options);
    this.dataEncipherment = (0, _utils.getStringOption)(attributes.dataEncipherment, options);
    this.decipherOnly = (0, _utils.getStringOption)(attributes.decipherOnly, options);
    this.digitalSignature = (0, _utils.getStringOption)(attributes.digitalSignature, options);
    this.encipherOnly = (0, _utils.getStringOption)(attributes.encipherOnly, options);
    this.id = attributes.id || "";
    this.keyAgreement = (0, _utils.getStringOption)(attributes.keyAgreement, options);
    this.keyCertSign = (0, _utils.getStringOption)(attributes.keyCertSign, options);
    this.keyEncipherment = (0, _utils.getStringOption)(attributes.keyEncipherment, options);
    this.nonRepudiation = (0, _utils.getStringOption)(attributes.nonRepudiation, options);
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }