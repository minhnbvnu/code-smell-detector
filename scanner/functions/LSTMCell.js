function LSTMCell(args) {
	    var _this12;

	    _this12 = _RNNCell3.call(this, args) || this;
	    _this12.DEFAULT_ACTIVATION = 'tanh';
	    _this12.DEFAULT_RECURRENT_ACTIVATION = 'hardSigmoid';
	    _this12.DEFAULT_KERNEL_INITIALIZER = 'glorotNormal';
	    _this12.DEFAULT_RECURRENT_INITIALIZER = 'orthogonal';
	    _this12.DEFAULT_BIAS_INITIALIZER = 'zeros';
	    _this12.units = args.units;
	    assertPositiveInteger(_this12.units, 'units');
	    _this12.activation = getActivation(args.activation === undefined ? _this12.DEFAULT_ACTIVATION : args.activation);
	    _this12.recurrentActivation = getActivation(args.recurrentActivation === undefined ? _this12.DEFAULT_RECURRENT_ACTIVATION : args.recurrentActivation);
	    _this12.useBias = args.useBias == null ? true : args.useBias;
	    _this12.kernelInitializer = getInitializer(args.kernelInitializer || _this12.DEFAULT_KERNEL_INITIALIZER);
	    _this12.recurrentInitializer = getInitializer(args.recurrentInitializer || _this12.DEFAULT_RECURRENT_INITIALIZER);
	    _this12.biasInitializer = getInitializer(args.biasInitializer || _this12.DEFAULT_BIAS_INITIALIZER);
	    _this12.unitForgetBias = args.unitForgetBias;
	    _this12.kernelRegularizer = getRegularizer(args.kernelRegularizer);
	    _this12.recurrentRegularizer = getRegularizer(args.recurrentRegularizer);
	    _this12.biasRegularizer = getRegularizer(args.biasRegularizer);
	    _this12.kernelConstraint = getConstraint(args.kernelConstraint);
	    _this12.recurrentConstraint = getConstraint(args.recurrentConstraint);
	    _this12.biasConstraint = getConstraint(args.biasConstraint);
	    _this12.dropout = min$a([1, max$5([0, args.dropout == null ? 0 : args.dropout])]);
	    _this12.recurrentDropout = min$a([1, max$5([0, args.recurrentDropout == null ? 0 : args.recurrentDropout])]);
	    _this12.implementation = args.implementation;
	    _this12.stateSize = [_this12.units, _this12.units];
	    _this12.dropoutMask = null;
	    _this12.recurrentDropoutMask = null;
	    return _this12;
	  }