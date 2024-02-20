function VarianceScaling(args) {
	    var _this8;

	    _this8 = _Initializer8.call(this) || this;

	    if (args.scale < 0.0) {
	      throw new ValueError("scale must be a positive float. Got: " + args.scale);
	    }

	    _this8.scale = args.scale == null ? 1.0 : args.scale;
	    _this8.mode = args.mode == null ? 'fanIn' : args.mode;
	    checkFanMode(_this8.mode);
	    _this8.distribution = args.distribution == null ? 'normal' : args.distribution;
	    checkDistribution(_this8.distribution);
	    _this8.seed = args.seed;
	    return _this8;
	  }