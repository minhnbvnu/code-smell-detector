function HeNormal(args) {
	    return _VarianceScaling3.call(this, {
	      scale: 2.0,
	      mode: 'fanIn',
	      distribution: 'normal',
	      seed: args == null ? null : args.seed
	    }) || this;
	  }