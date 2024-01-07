function RMSPropOptimizer(learningRate, decay, momentum, epsilon, centered) {
	    var _this;

	    if (decay === void 0) {
	      decay = 0.9;
	    }

	    if (momentum === void 0) {
	      momentum = 0.0;
	    }

	    if (epsilon === void 0) {
	      epsilon = null;
	    }

	    if (centered === void 0) {
	      centered = false;
	    }

	    _this = _Optimizer.call(this) || this;
	    _this.learningRate = learningRate;
	    _this.decay = decay;
	    _this.momentum = momentum;
	    _this.epsilon = epsilon;
	    _this.accumulatedMeanSquares = [];
	    _this.accumulatedMoments = [];
	    _this.accumulatedMeanGrads = [];
	    _this.centered = centered;

	    if (epsilon == null) {
	      _this.epsilon = ENGINE.backend.epsilon();
	    }

	    if (learningRate == null) {
	      throw new Error("learningRate for RMSPropOptimizer must be defined.");
	    }

	    return _this;
	  }