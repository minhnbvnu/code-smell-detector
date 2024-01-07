constructor({
    loadedName,
    font,
    dict,
    extraProperties = false
  }) {
    this.loadedName = loadedName;
    this.font = font;
    this.dict = dict;
    this._extraProperties = extraProperties;
    this.type3Loaded = null;
    this.type3Dependencies = font.isType3Font ? new Set() : null;
    this.sent = false;
  }