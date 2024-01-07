function Concatenate(args) {
	    var _this3;

	    _this3 = _Merge6.call(this, args) || this;
	    _this3.DEFAULT_AXIS = -1;

	    if (args == null) {
	      args = {};
	    }

	    _this3.axis = args.axis == null ? _this3.DEFAULT_AXIS : args.axis;
	    _this3.supportsMasking = true;
	    _this3.reshapeRequired = false;
	    return _this3;
	  }