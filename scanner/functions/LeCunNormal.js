function LeCunNormal(args) {
	    return _VarianceScaling5.call(this, {
	      scale: 1.0,
	      mode: 'fanIn',
	      distribution: 'normal',
	      seed: args == null ? null : args.seed
	    }) || this;
	  }