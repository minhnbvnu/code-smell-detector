function LeakyReLU(args) {
	    var _this2;

	    _this2 = _Layer2.call(this, args == null ? {} : args) || this;
	    _this2.DEFAULT_ALPHA = 0.3;

	    if (args == null) {
	      args = {};
	    }

	    _this2.alpha = args.alpha == null ? _this2.DEFAULT_ALPHA : args.alpha;
	    return _this2;
	  }