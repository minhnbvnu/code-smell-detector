function DepthwiseConv2D(args) {
	    var _this;

	    _this = _BaseConv.call(this, 2, args) || this;
	    _this.depthwiseKernel = null;
	    _this.depthMultiplier = args.depthMultiplier == null ? 1 : args.depthMultiplier;
	    _this.depthwiseInitializer = getInitializer(args.depthwiseInitializer || _this.DEFAULT_KERNEL_INITIALIZER);
	    _this.depthwiseConstraint = getConstraint(args.depthwiseConstraint);
	    _this.depthwiseRegularizer = getRegularizer(args.depthwiseRegularizer);
	    return _this;
	  }