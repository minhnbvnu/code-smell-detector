function Pooling3D(args) {
	    var _this5;

	    if (args.poolSize == null) {
	      args.poolSize = [2, 2, 2];
	    }

	    _this5 = _Layer3.call(this, args) || this;
	    _this5.poolSize = Array.isArray(args.poolSize) ? args.poolSize : [args.poolSize, args.poolSize, args.poolSize];

	    if (args.strides == null) {
	      _this5.strides = _this5.poolSize;
	    } else if (Array.isArray(args.strides)) {
	      if (args.strides.length !== 3) {
	        throw new ValueError("If the strides property of a 3D pooling layer is an Array, " + "it is expected to have a length of 3, but received length " + (args.strides.length + "."));
	      }

	      _this5.strides = args.strides;
	    } else {
	      // `config.strides` is a number.
	      _this5.strides = [args.strides, args.strides, args.strides];
	    }

	    assertPositiveInteger(_this5.poolSize, 'poolSize');
	    assertPositiveInteger(_this5.strides, 'strides');
	    _this5.padding = args.padding == null ? 'valid' : args.padding;
	    _this5.dataFormat = args.dataFormat == null ? 'channelsLast' : args.dataFormat;
	    checkDataFormat(_this5.dataFormat);
	    checkPaddingMode(_this5.padding);
	    _this5.inputSpec = [new InputSpec({
	      ndim: 5
	    })];
	    return _this5;
	  }