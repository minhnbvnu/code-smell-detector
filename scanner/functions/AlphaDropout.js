function AlphaDropout(args) {
	    var _this5;

	    _this5 = _Layer3.call(this, args) || this;
	    _this5.supportsMasking = true;
	    _this5.rate = args.rate;
	    _this5.noiseShape = args.noiseShape;
	    return _this5;
	  }