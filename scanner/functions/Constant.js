function Constant(args) {
	    var _this;

	    _this = _Initializer3.call(this) || this;

	    if (typeof args !== 'object') {
	      throw new ValueError("Expected argument of type ConstantConfig but got " + args);
	    }

	    if (args.value === undefined) {
	      throw new ValueError("config must have value set but got " + args);
	    }

	    _this.value = args.value;
	    return _this;
	  }