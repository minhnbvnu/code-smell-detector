function ReLU(args) {
	    var _this;

	    _this = _Layer.call(this, args == null ? {} : args) || this;
	    _this.supportsMasking = true;

	    if (args != null) {
	      _this.maxValue = args.maxValue;
	    }

	    return _this;
	  }