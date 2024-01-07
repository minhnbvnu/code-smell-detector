function RandomNormal(args) {
	    var _this4;

	    _this4 = _Initializer5.call(this) || this;
	    _this4.DEFAULT_MEAN = 0.;
	    _this4.DEFAULT_STDDEV = 0.05;
	    _this4.mean = args.mean || _this4.DEFAULT_MEAN;
	    _this4.stddev = args.stddev || _this4.DEFAULT_STDDEV;
	    _this4.seed = args.seed;
	    return _this4;
	  }