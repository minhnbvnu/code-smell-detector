function TruncatedNormal(args) {
	    var _this5;

	    _this5 = _Initializer6.call(this) || this;
	    _this5.DEFAULT_MEAN = 0.;
	    _this5.DEFAULT_STDDEV = 0.05;
	    _this5.mean = args.mean || _this5.DEFAULT_MEAN;
	    _this5.stddev = args.stddev || _this5.DEFAULT_STDDEV;
	    _this5.seed = args.seed;
	    return _this5;
	  }