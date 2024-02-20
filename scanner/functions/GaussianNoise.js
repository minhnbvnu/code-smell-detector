function GaussianNoise(args) {
	    var _this;

	    _this = _Layer.call(this, args) || this;
	    _this.supportsMasking = true;
	    _this.stddev = args.stddev;
	    return _this;
	  }