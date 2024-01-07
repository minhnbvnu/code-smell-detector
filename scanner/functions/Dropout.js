function Dropout(args) {
	    var _this;

	    _this = _Layer.call(this, args) || this;
	    _this.rate = Math.max(Math.min(args.rate, 1), 0); // So that the scalar doesn't get tidied up between executions.

	    _this.noiseShape = args.noiseShape;
	    _this.seed = args.seed;
	    _this.supportsMasking = true;
	    return _this;
	  }