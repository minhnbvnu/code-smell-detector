function SharedStrings(node) {
    _classCallCheck(this, SharedStrings);

    this._stringArray = [];
    this._indexMap = {};

    this._init(node);

    this._cacheExistingSharedStrings();
  }