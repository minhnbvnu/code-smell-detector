function RandomUniform(args) {
	    var _this3;

	    _this3 = _Initializer4.call(this) || this;
	    _this3.DEFAULT_MINVAL = -0.05;
	    _this3.DEFAULT_MAXVAL = 0.05;
	    _this3.minval = args.minval || _this3.DEFAULT_MINVAL;
	    _this3.maxval = args.maxval || _this3.DEFAULT_MAXVAL;
	    _this3.seed = args.seed;
	    return _this3;
	  }