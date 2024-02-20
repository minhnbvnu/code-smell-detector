function GlorotUniform(args) {
	    return _VarianceScaling.call(this, {
	      scale: 1.0,
	      mode: 'fanAvg',
	      distribution: 'uniform',
	      seed: args == null ? null : args.seed
	    }) || this;
	  }