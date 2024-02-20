function Warning(text) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Warning);
    this.type = 'warning';
    this.text = text;
    if (opts.node && opts.node.source) {
      var range = opts.node.rangeBy(opts);
      this.line = range.start.line;
      this.column = range.start.column;
      this.endLine = range.end.line;
      this.endColumn = range.end.column;
    }
    for (var opt in opts) this[opt] = opts[opt];
  }