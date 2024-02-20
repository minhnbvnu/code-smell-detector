function Masking(args) {
	    var _this15;

	    _this15 = _Layer8.call(this, args == null ? {} : args) || this;
	    _this15.supportsMasking = true;

	    if (args != null) {
	      _this15.maskValue = args.maskValue == null ? 0 : args.maskValue;
	    } else {
	      _this15.maskValue = 0;
	    }

	    return _this15;
	  }