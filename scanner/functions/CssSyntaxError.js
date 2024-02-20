function CssSyntaxError(message, line, column, source, file, plugin) {
    var _this;
    _classCallCheck(this, CssSyntaxError);
    _this = _super.call(this, message);
    _this.name = 'CssSyntaxError';
    _this.reason = message;
    if (file) {
      _this.file = file;
    }
    if (source) {
      _this.source = source;
    }
    if (plugin) {
      _this.plugin = plugin;
    }
    if (typeof line !== 'undefined' && typeof column !== 'undefined') {
      if (typeof line === 'number') {
        _this.line = line;
        _this.column = column;
      } else {
        _this.line = line.line;
        _this.column = line.column;
        _this.endLine = column.line;
        _this.endColumn = column.column;
      }
    }
    _this.setMessage();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), CssSyntaxError);
    }
    return _this;
  }