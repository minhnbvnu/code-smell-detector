function AdamOptimizer(learningRate, beta1, beta2, epsilon) {
	    var _this;

	    if (epsilon === void 0) {
	      epsilon = null;
	    }

	    _this = _Optimizer.call(this) || this;
	    _this.learningRate = learningRate;
	    _this.beta1 = beta1;
	    _this.beta2 = beta2;
	    _this.epsilon = epsilon;
	    _this.accumulatedFirstMoment = [];
	    _this.accumulatedSecondMoment = [];
	    tidy(function () {
	      // accB* will be updated by batch.
	      _this.accBeta1 = scalar(beta1).variable();
	      _this.accBeta2 = scalar(beta2).variable();
	    });

	    if (epsilon == null) {
	      _this.epsilon = ENGINE.backend.epsilon();
	    }

	    return _this;
	  }