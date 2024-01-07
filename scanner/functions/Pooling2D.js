function Pooling2D(args) {
	    var _this3;

	    if (args.poolSize == null) {
	      args.poolSize = [2, 2];
	    }

	    _this3 = _Layer2.call(this, args) || this;
	    _this3.poolSize = Array.isArray(args.poolSize) ? args.poolSize : [args.poolSize, args.poolSize];

	    if (args.strides == null) {
	      _this3.strides = _this3.poolSize;
	    } else if (Array.isArray(args.strides)) {
	      if (args.strides.length !== 2) {
	        throw new ValueError("If the strides property of a 2D pooling layer is an Array, " + "it is expected to have a length of 2, but received length " + (args.strides.length + "."));
	      }

	      _this3.strides = args.strides;
	    } else {
	      // `config.strides` is a number.
	      _this3.strides = [args.strides, args.strides];
	    }

	    assertPositiveInteger(_this3.poolSize, 'poolSize');
	    assertPositiveInteger(_this3.strides, 'strides');
	    _this3.padding = args.padding == null ? 'valid' : args.padding;
	    _this3.dataFormat = args.dataFormat == null ? 'channelsLast' : args.dataFormat;
	    checkDataFormat(_this3.dataFormat);
	    checkPaddingMode(_this3.padding);
	    _this3.inputSpec = [new InputSpec({
	      ndim: 4
	    })];
	    return _this3;
	  }