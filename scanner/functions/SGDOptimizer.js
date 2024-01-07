function SGDOptimizer(learningRate) {
	    var _this;

	    _this = _Optimizer.call(this) || this;
	    _this.learningRate = learningRate;

	    _this.setLearningRate(learningRate);

	    return _this;
	  }