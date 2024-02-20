function GRUCell(args) {
	    var _this9;

	    _this9 = _RNNCell2.call(this, args) || this;
	    _this9.DEFAULT_ACTIVATION = 'tanh';
	    _this9.DEFAULT_RECURRENT_ACTIVATION = 'hardSigmoid';
	    _this9.DEFAULT_KERNEL_INITIALIZER = 'glorotNormal';
	    _this9.DEFAULT_RECURRENT_INITIALIZER = 'orthogonal';
	    _this9.DEFAULT_BIAS_INITIALIZER = 'zeros';

	    if (args.resetAfter) {
	      throw new ValueError("GRUCell does not support reset_after parameter set to true.");
	    }

	    _this9.units = args.units;
	    assertPositiveInteger(_this9.units, 'units');
	    _this9.activation = getActivation(args.activation === undefined ? _this9.DEFAULT_ACTIVATION : args.activation);
	    _this9.recurrentActivation = getActivation(args.recurrentActivation === undefined ? _this9.DEFAULT_RECURRENT_ACTIVATION : args.recurrentActivation);
	    _this9.useBias = args.useBias == null ? true : args.useBias;
	    _this9.kernelInitializer = getInitializer(args.kernelInitializer || _this9.DEFAULT_KERNEL_INITIALIZER);
	    _this9.recurrentInitializer = getInitializer(args.recurrentInitializer || _this9.DEFAULT_RECURRENT_INITIALIZER);
	    _this9.biasInitializer = getInitializer(args.biasInitializer || _this9.DEFAULT_BIAS_INITIALIZER);
	    _this9.kernelRegularizer = getRegularizer(args.kernelRegularizer);
	    _this9.recurrentRegularizer = getRegularizer(args.recurrentRegularizer);
	    _this9.biasRegularizer = getRegularizer(args.biasRegularizer);
	    _this9.kernelConstraint = getConstraint(args.kernelConstraint);
	    _this9.recurrentConstraint = getConstraint(args.recurrentConstraint);
	    _this9.biasConstraint = getConstraint(args.biasConstraint);
	    _this9.dropout = min$a([1, max$5([0, args.dropout == null ? 0 : args.dropout])]);
	    _this9.recurrentDropout = min$a([1, max$5([0, args.recurrentDropout == null ? 0 : args.recurrentDropout])]);
	    _this9.implementation = args.implementation;
	    _this9.stateSize = _this9.units;
	    _this9.dropoutMask = null;
	    _this9.recurrentDropoutMask = null;
	    return _this9;
	  }