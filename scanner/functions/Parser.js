function Parser(options, input) {
	    classCallCheck(this, Parser);

	    options = getOptions(options);

	    var _this = possibleConstructorReturn(this, _Tokenizer.call(this, options, input));

	    _this.options = options;
	    _this.inModule = _this.options.sourceType === "module";
	    _this.input = input;
	    _this.plugins = _this.loadPlugins(_this.options.plugins);
	    _this.filename = options.sourceFilename;

	    // If enabled, skip leading hashbang line.
	    if (_this.state.pos === 0 && _this.input[0] === "#" && _this.input[1] === "!") {
	      _this.skipLineComment(2);
	    }
	    return _this;
	  }