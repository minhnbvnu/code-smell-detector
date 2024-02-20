function GlorotNormal(args) {
	    return _VarianceScaling2.call(this, {
	      scale: 1.0,
	      mode: 'fanAvg',
	      distribution: 'normal',
	      seed: args == null ? null : args.seed
	    }) || this;
	  }