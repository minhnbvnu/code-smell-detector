function LeCunUniform(args) {
	    return _VarianceScaling6.call(this, {
	      scale: 1.0,
	      mode: 'fanIn',
	      distribution: 'uniform',
	      seed: args == null ? null : args.seed
	    }) || this;
	  }