function SimpleRNNCell(args) {
	    var _this6;

	    _this6 = _RNNCell.call(this, args) || this;
	    _this6.DEFAULT_ACTIVATION = 'tanh';
	    _this6.DEFAULT_KERNEL_INITIALIZER = 'glorotNormal';
	    _this6.DEFAULT_RECURRENT_INITIALIZER = 'orthogonal';
	    _this6.DEFAULT_BIAS_INITIALIZER = 'zeros';
	    _this6.units = args.units;
	    assertPositiveInteger(_this6.units, "units");
	    _this6.activation = getActivation(args.activation == null ? _this6.DEFAULT_ACTIVATION : args.activation);
	    _this6.useBias = args.useBias == null ? true : args.useBias;
	    _this6.kernelInitializer = getInitializer(args.kernelInitializer || _this6.DEFAULT_KERNEL_INITIALIZER);
	    _this6.recurrentInitializer = getInitializer(args.recurrentInitializer || _this6.DEFAULT_RECURRENT_INITIALIZER);
	    _this6.biasInitializer = getInitializer(args.biasInitializer || _this6.DEFAULT_BIAS_INITIALIZER);
	    _this6.kernelRegularizer = getRegularizer(args.kernelRegularizer);
	    _this6.recurrentRegularizer = getRegularizer(args.recurrentRegularizer);
	    _this6.biasRegularizer = getRegularizer(args.biasRegularizer);
	    _this6.kernelConstraint = getConstraint(args.kernelConstraint);
	    _this6.recurrentConstraint = getConstraint(args.recurrentConstraint);
	    _this6.biasConstraint = getConstraint(args.biasConstraint);
	    _this6.dropout = min$a([1, max$5([0, args.dropout == null ? 0 : args.dropout])]);
	    _this6.recurrentDropout = min$a([1, max$5([0, args.recurrentDropout == null ? 0 : args.recurrentDropout])]);
	    _this6.stateSize = _this6.units;
	    _this6.dropoutMask = null;
	    _this6.recurrentDropoutMask = null;
	    return _this6;
	  }