function HeUniform(args) {
	    return _VarianceScaling4.call(this, {
	      scale: 2.0,
	      mode: 'fanIn',
	      distribution: 'uniform',
	      seed: args == null ? null : args.seed
	    }) || this;
	  }