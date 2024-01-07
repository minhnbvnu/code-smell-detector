function Pooling1D(args) {
	    var _this;

	    if (args.poolSize == null) {
	      args.poolSize = 2;
	    }

	    _this = _Layer.call(this, args) || this;

	    if (typeof args.poolSize === 'number') {
	      _this.poolSize = [args.poolSize];
	    } else if (Array.isArray(args.poolSize) && args.poolSize.length === 1 && typeof args.poolSize[0] === 'number') {
	      _this.poolSize = args.poolSize;
	    } else {
	      throw new ValueError("poolSize for 1D convolutional layer must be a number or an " + "Array of a single number, but received " + ("" + JSON.stringify(args.poolSize)));
	    }

	    assertPositiveInteger(_this.poolSize, 'poolSize');

	    if (args.strides == null) {
	      _this.strides = _this.poolSize;
	    } else {
	      if (typeof args.strides === 'number') {
	        _this.strides = [args.strides];
	      } else if (Array.isArray(args.strides) && args.strides.length === 1 && typeof args.strides[0] === 'number') {
	        _this.strides = args.strides;
	      } else {
	        throw new ValueError("strides for 1D convolutional layer must be a number or an " + "Array of a single number, but received " + ("" + JSON.stringify(args.strides)));
	      }
	    }

	    assertPositiveInteger(_this.strides, 'strides');
	    _this.padding = args.padding == null ? 'valid' : args.padding;
	    checkPaddingMode(_this.padding);
	    _this.inputSpec = [new InputSpec({
	      ndim: 3
	    })];
	    return _this;
	  }