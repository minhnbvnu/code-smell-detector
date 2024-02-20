function SpatialDropout1D(args) {
	    var _this3;

	    _this3 = _Dropout.call(this, args) || this;
	    _this3.inputSpec = [{
	      ndim: 3
	    }];
	    return _this3;
	  }