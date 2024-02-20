function MemoryPlayComponent() {
    var autoPlay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var getTime = arguments[1];
    var saveTimeFunction = arguments[2];

    _classCallCheck(this, MemoryPlayComponent);

    this.html = (0, _utils.parseDom)(_index2.default);
    this.autoPlay = autoPlay;
    this.getTime = getTime || this._getTime;
    this.saveTimeFunction = saveTimeFunction || this._saveTime;
    this.hasMemoryDisplay = false;
  }