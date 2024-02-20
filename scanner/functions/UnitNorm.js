function UnitNorm(args) {
	    var _this3;

	    _this3 = _Constraint2.call(this) || this;
	    _this3.defaultAxis = 0;
	    _this3.axis = args.axis != null ? args.axis : _this3.defaultAxis;
	    return _this3;
	  }