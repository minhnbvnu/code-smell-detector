constructor({
    hasAttributes = false,
    lowerCaseName = false
  }) {
    super();
    this._currentFragment = null;
    this._stack = null;
    this._errorCode = XMLParserErrorCode.NoError;
    this._hasAttributes = hasAttributes;
    this._lowerCaseName = lowerCaseName;
  }