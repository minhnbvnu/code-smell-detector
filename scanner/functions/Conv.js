function Conv(rank, args) {
	    var _this2;

	    _this2 = _BaseConv.call(this, rank, args) || this;
	    _this2.kernel = null;
	    Conv.verifyArgs(args);
	    _this2.filters = args.filters;
	    assertPositiveInteger(_this2.filters, 'filters');
	    _this2.kernelInitializer = getInitializer(args.kernelInitializer || _this2.DEFAULT_KERNEL_INITIALIZER);
	    _this2.kernelConstraint = getConstraint(args.kernelConstraint);
	    _this2.kernelRegularizer = getRegularizer(args.kernelRegularizer);
	    return _this2;
	  }