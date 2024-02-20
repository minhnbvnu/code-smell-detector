function LayerNormalization(args) {
	    var _this3;

	    if (args == null) {
	      args = {};
	    }

	    _this3 = _Layer2.call(this, args) || this;
	    _this3.axis = args.axis == null ? -1 : args.axis;

	    if (typeof _this3.axis === 'number') {
	      if (!Number.isInteger(_this3.axis)) {
	        throw new Error("Expected axis to be an integer, but received " + _this3.axis);
	      }
	    } else if (Array.isArray(_this3.axis)) {
	      for (var _iterator2 = _createForOfIteratorHelperLoose(_this3.axis), _step2; !(_step2 = _iterator2()).done;) {
	        var axis = _step2.value;

	        if (!Number.isInteger(axis)) {
	          throw new Error("Expected axis to be an array of integers, " + ("but received " + JSON.stringify(_this3.axis)));
	        }
	      }
	    } else {
	      throw new Error("Expected axis to be an integer or an array of integers, " + ("but received " + JSON.stringify(_this3.axis)));
	    }

	    _this3.epsilon = args.epsilon == null ? 1e-3 : args.epsilon;
	    _this3.center = args.center == null ? true : args.center;
	    _this3.scale = args.scale == null ? true : args.scale;
	    _this3.betaInitializer = getInitializer(args.betaInitializer || 'zeros');
	    _this3.gammaInitializer = getInitializer(args.gammaInitializer || 'ones');
	    _this3.betaRegularizer = getRegularizer(args.betaRegularizer);
	    _this3.gammaRegularizer = getRegularizer(args.gammaRegularizer);
	    _this3.supportsMasking = true;
	    return _this3;
	  }