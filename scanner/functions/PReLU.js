function PReLU(args) {
	    var _this3;

	    _this3 = _Layer3.call(this, args == null ? {} : args) || this;
	    _this3.DEFAULT_ALPHA_INITIALIZER = 'zeros';

	    if (args == null) {
	      args = {};
	    }

	    _this3.supportsMasking = true;
	    _this3.alphaInitializer = getInitializer(args.alphaInitializer || _this3.DEFAULT_ALPHA_INITIALIZER);
	    _this3.alphaRegularizer = getRegularizer(args.alphaRegularizer);
	    _this3.alphaConstraint = getConstraint(args.alphaConstraint);

	    if (args.sharedAxes == null) {
	      _this3.sharedAxes = null;
	    } else if (Array.isArray(args.sharedAxes)) {
	      _this3.sharedAxes = args.sharedAxes;
	    } else if (typeof args.sharedAxes === 'number') {
	      _this3.sharedAxes = [args.sharedAxes];
	    } else {
	      throw new ValueError("Expected sharedAxes to be a number or an array of numbers, " + ("but got " + args.sharedAxes));
	    }

	    return _this3;
	  }