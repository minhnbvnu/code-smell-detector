function MinMaxNorm(args) {
	    var _this5;

	    _this5 = _Constraint4.call(this) || this;
	    _this5.defaultMinValue = 0.0;
	    _this5.defaultMaxValue = 1.0;
	    _this5.defaultRate = 1.0;
	    _this5.defaultAxis = 0;
	    _this5.minValue = args.minValue != null ? args.minValue : _this5.defaultMinValue;
	    _this5.maxValue = args.maxValue != null ? args.maxValue : _this5.defaultMaxValue;
	    _this5.rate = args.rate != null ? args.rate : _this5.defaultRate;
	    _this5.axis = args.axis != null ? args.axis : _this5.defaultAxis;
	    return _this5;
	  }