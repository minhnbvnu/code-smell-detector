function ELU(args) {
	    var _this4;

	    _this4 = _Layer4.call(this, args == null ? {} : args) || this;
	    _this4.DEFAULT_ALPHA = 1.0;

	    if (args == null) {
	      args = {};
	    }

	    if (args.alpha != null && args.alpha !== _this4.DEFAULT_ALPHA) {
	      throw new NotImplementedError("Non-default alpha value (" + args.alpha + ") is not supported by the " + "ELU layer yet.");
	    }

	    _this4.alpha = args.alpha == null ? _this4.DEFAULT_ALPHA : args.alpha;
	    return _this4;
	  }