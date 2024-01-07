function AdadeltaOptimizer(learningRate, rho, epsilon) {
	    var _this;

	    if (epsilon === void 0) {
	      epsilon = null;
	    }

	    _this = _Optimizer.call(this) || this;
	    _this.learningRate = learningRate;
	    _this.rho = rho;
	    _this.epsilon = epsilon;
	    _this.accumulatedGrads = [];
	    _this.accumulatedUpdates = [];

	    if (epsilon == null) {
	      _this.epsilon = ENGINE.backend.epsilon();
	    }

	    return _this;
	  }