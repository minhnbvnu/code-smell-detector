function Dense(args) {
	    var _this4;

	    _this4 = _Layer2.call(this, args) || this; // Default activation: Linear (none).

	    _this4.activation = null;
	    _this4.useBias = true;
	    _this4.kernel = null;
	    _this4.bias = null;
	    _this4.DEFAULT_KERNEL_INITIALIZER = 'glorotNormal';
	    _this4.DEFAULT_BIAS_INITIALIZER = 'zeros';

	    if (args.batchInputShape == null && args.inputShape == null && args.inputDim != null) {
	      // This logic is copied from Layer's constructor, since we can't
	      // do exactly what the Python constructor does for Dense().
	      var batchSize = null;

	      if (args.batchSize != null) {
	        batchSize = args.batchSize;
	      }

	      _this4.batchInputShape = [batchSize, args.inputDim];
	    }

	    _this4.units = args.units;
	    assertPositiveInteger(_this4.units, 'units');
	    _this4.activation = getActivation(args.activation);

	    if (args.useBias != null) {
	      _this4.useBias = args.useBias;
	    }

	    _this4.kernelInitializer = getInitializer(args.kernelInitializer || _this4.DEFAULT_KERNEL_INITIALIZER);
	    _this4.biasInitializer = getInitializer(args.biasInitializer || _this4.DEFAULT_BIAS_INITIALIZER);
	    _this4.kernelConstraint = getConstraint(args.kernelConstraint);
	    _this4.biasConstraint = getConstraint(args.biasConstraint);
	    _this4.kernelRegularizer = getRegularizer(args.kernelRegularizer);
	    _this4.biasRegularizer = getRegularizer(args.biasRegularizer);
	    _this4.activityRegularizer = getRegularizer(args.activityRegularizer);
	    _this4.supportsMasking = true;
	    _this4.inputSpec = [{
	      minNDim: 2
	    }];
	    return _this4;
	  }