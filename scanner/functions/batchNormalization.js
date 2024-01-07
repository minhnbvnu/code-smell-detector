function BatchNormalization(args) {
	    var _this;

	    if (args == null) {
	      args = {};
	    }

	    _this = _Layer.call(this, args) || this;
	    _this.supportsMasking = true;
	    _this.axis = args.axis == null ? -1 : args.axis;
	    _this.momentum = args.momentum == null ? 0.99 : args.momentum;
	    _this.epsilon = args.epsilon == null ? 1e-3 : args.epsilon;
	    _this.center = args.center == null ? true : args.center;
	    _this.scale = args.scale == null ? true : args.scale;
	    _this.betaInitializer = getInitializer(args.betaInitializer || 'zeros');
	    _this.gammaInitializer = getInitializer(args.gammaInitializer || 'ones');
	    _this.movingMeanInitializer = getInitializer(args.movingMeanInitializer || 'zeros');
	    _this.movingVarianceInitializer = getInitializer(args.movingVarianceInitializer || 'ones');
	    _this.betaConstraint = getConstraint(args.betaConstraint);
	    _this.gammaConstraint = getConstraint(args.gammaConstraint);
	    _this.betaRegularizer = getRegularizer(args.betaRegularizer);
	    _this.gammaRegularizer = getRegularizer(args.gammaRegularizer);
	    return _this;
	  }