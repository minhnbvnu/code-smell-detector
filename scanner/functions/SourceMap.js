function SourceMap(opts, code) {
	    (0, _classCallCheck3.default)(this, SourceMap);

	    this._cachedMap = null;
	    this._code = code;
	    this._opts = opts;
	    this._rawMappings = [];
	  }