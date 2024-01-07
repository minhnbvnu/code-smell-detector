function FileDataSource(input, options) {
	    var _this;

	    if (options === void 0) {
	      options = {};
	    }

	    _this = _DataSource.call(this) || this;
	    _this.input = input;
	    _this.options = options;
	    return _this;
	  }