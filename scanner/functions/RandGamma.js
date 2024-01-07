function RandGamma(alpha, beta, dtype, seed) {
	    this.alpha = alpha;
	    this.beta = 1 / beta; // convert rate to scale parameter

	    this.dtype = dtype;
	    var seedValue = seed ? seed : Math.random();
	    this.randu = seedrandom_1(seedValue.toString());
	    this.randn = new MPRandGauss(0, 1, dtype, false, this.randu());

	    if (alpha < 1) {
	      this.d = alpha + 2 / 3;
	    } else {
	      this.d = alpha - 1 / 3;
	    }

	    this.c = 1 / Math.sqrt(9 * this.d);
	  }