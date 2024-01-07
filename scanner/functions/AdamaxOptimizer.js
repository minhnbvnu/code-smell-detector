function AdamaxOptimizer(learningRate, beta1, beta2, epsilon, decay) {
	    var _this;

	    if (epsilon === void 0) {
	      epsilon = null;
	    }

	    if (decay === void 0) {
	      decay = 0.0;
	    }

	    _this = _Optimizer.call(this) || this;
	    _this.learningRate = learningRate;
	    _this.beta1 = beta1;
	    _this.beta2 = beta2;
	    _this.epsilon = epsilon;
	    _this.decay = decay;
	    _this.accumulatedFirstMoment = [];
	    _this.accumulatedWeightedInfNorm = [];
	    tidy(function () {
	      _this.iteration = scalar(0).variable();
	      _this.accBeta1 = scalar(beta1).variable();
	    });

	    if (epsilon == null) {
	      _this.epsilon = ENGINE.backend.epsilon();
	    }

	    return _this;
	  }