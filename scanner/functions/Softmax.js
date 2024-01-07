function Softmax(args) {
	    var _this6;

	    _this6 = _Layer6.call(this, args == null ? {} : args) || this;
	    _this6.DEFAULT_AXIS = 1.0;

	    if (args == null) {
	      args = {};
	    }

	    _this6.softmax = new Softmax$1().apply;
	    _this6.axis = args.axis == null ? _this6.DEFAULT_AXIS : args.axis;
	    return _this6;
	  }