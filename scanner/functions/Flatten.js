function Flatten(args) {
	    var _this6;

	    args = args || {};
	    _this6 = _Layer3.call(this, args) || this;
	    _this6.inputSpec = [{
	      minNDim: 3
	    }];
	    _this6.dataFormat = args.dataFormat;
	    return _this6;
	  }