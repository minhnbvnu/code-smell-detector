function GaussianDropout(args) {
	    var _this3;

	    _this3 = _Layer2.call(this, args) || this;
	    _this3.supportsMasking = true;
	    _this3.rate = args.rate;
	    return _this3;
	  }