constructor() {
    super();
    this._builder = new _builder.Builder();
    this._stack = [];
    this._ids = new Map();
    this._current = this._builder.buildRoot(this._ids);
    this._errorCode = _xml_parser.XMLParserErrorCode.NoError;
    this._whiteRegex = /^\s+$/;
  }