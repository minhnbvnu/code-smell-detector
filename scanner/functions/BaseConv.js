function BaseConv(rank, args) {
	    var _this;

	    _this = _Layer.call(this, args) || this;
	    _this.bias = null;
	    _this.DEFAULT_KERNEL_INITIALIZER = 'glorotNormal';
	    _this.DEFAULT_BIAS_INITIALIZER = 'zeros';
	    BaseConv.verifyArgs(args);
	    _this.rank = rank;
	    assertPositiveInteger(_this.rank, 'rank');

	    if (_this.rank !== 1 && _this.rank !== 2 && _this.rank !== 3) {
	      throw new NotImplementedError("Convolution layer for rank other than 1, 2, or 3 (" + _this.rank + ") is " + "not implemented yet.");
	    }

	    _this.kernelSize = normalizeArray(args.kernelSize, rank, 'kernelSize');
	    _this.strides = normalizeArray(args.strides == null ? 1 : args.strides, rank, 'strides');
	    _this.padding = args.padding == null ? 'valid' : args.padding;
	    checkPaddingMode(_this.padding);
	    _this.dataFormat = args.dataFormat == null ? 'channelsLast' : args.dataFormat;
	    checkDataFormat(_this.dataFormat);
	    _this.activation = getActivation(args.activation);
	    _this.useBias = args.useBias == null ? true : args.useBias;
	    _this.biasInitializer = getInitializer(args.biasInitializer || _this.DEFAULT_BIAS_INITIALIZER);
	    _this.biasConstraint = getConstraint(args.biasConstraint);
	    _this.biasRegularizer = getRegularizer(args.biasRegularizer);
	    _this.activityRegularizer = getRegularizer(args.activityRegularizer);
	    _this.dilationRate = normalizeArray(args.dilationRate == null ? 1 : args.dilationRate, rank, 'dilationRate');

	    if (_this.rank === 1 && Array.isArray(_this.dilationRate) && _this.dilationRate.length !== 1) {
	      throw new ValueError("dilationRate must be a number or an array of a single number " + "for 1D convolution, but received " + ("" + JSON.stringify(_this.dilationRate)));
	    } else if (_this.rank === 2) {
	      if (typeof _this.dilationRate === 'number') {
	        _this.dilationRate = [_this.dilationRate, _this.dilationRate];
	      } else if (_this.dilationRate.length !== 2) {
	        throw new ValueError("dilationRate must be a number or array of two numbers for 2D " + ("convolution, but received " + JSON.stringify(_this.dilationRate)));
	      }
	    } else if (_this.rank === 3) {
	      if (typeof _this.dilationRate === 'number') {
	        _this.dilationRate = [_this.dilationRate, _this.dilationRate, _this.dilationRate];
	      } else if (_this.dilationRate.length !== 3) {
	        throw new ValueError("dilationRate must be a number or array of three numbers for 3D " + ("convolution, but received " + JSON.stringify(_this.dilationRate)));
	      }
	    }

	    return _this;
	  }