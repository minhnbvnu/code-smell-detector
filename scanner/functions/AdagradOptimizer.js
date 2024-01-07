function AdagradOptimizer(learningRate, initialAccumulatorValue) {
	    var _this;

	    if (initialAccumulatorValue === void 0) {
	      initialAccumulatorValue = 0.1;
	    }

	    _this = _Optimizer.call(this) || this;
	    _this.learningRate = learningRate;
	    _this.initialAccumulatorValue = initialAccumulatorValue;
	    _this.accumulatedGrads = [];
	    return _this;
	  }