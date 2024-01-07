function MomentumOptimizer(learningRate, momentum, useNesterov) {
	    var _this;

	    if (useNesterov === void 0) {
	      useNesterov = false;
	    }

	    _this = _SGDOptimizer.call(this, learningRate) || this;
	    _this.learningRate = learningRate;
	    _this.momentum = momentum;
	    _this.useNesterov = useNesterov;
	    _this.accumulations = [];
	    _this.m = scalar(_this.momentum);
	    return _this;
	  }