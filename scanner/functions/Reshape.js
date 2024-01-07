function Reshape(args) {
	    var _this12;

	    _this12 = _Layer6.call(this, args) || this;
	    _this12.targetShape = args.targetShape; // Make sure that all unknown dimensions are represented as `null`.

	    for (var i = 0; i < _this12.targetShape.length; ++i) {
	      if (_this12.isUnknown(_this12.targetShape[i])) {
	        _this12.targetShape[i] = null;
	      }
	    }

	    return _this12;
	  }