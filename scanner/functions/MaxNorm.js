function MaxNorm(args) {
	    var _this;

	    _this = _Constraint.call(this) || this;
	    _this.defaultMaxValue = 2;
	    _this.defaultAxis = 0;
	    _this.maxValue = args.maxValue != null ? args.maxValue : _this.defaultMaxValue;
	    _this.axis = args.axis != null ? args.axis : _this.defaultAxis;
	    return _this;
	  }