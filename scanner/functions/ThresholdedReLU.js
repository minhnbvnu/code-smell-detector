function ThresholdedReLU(args) {
	    var _this5;

	    _this5 = _Layer5.call(this, args == null ? {} : args) || this;
	    _this5.DEFAULT_THETA = 1.0;

	    if (args == null) {
	      args = {};
	    }

	    _this5.theta = args.theta == null ? _this5.DEFAULT_THETA : args.theta;
	    return _this5;
	  }