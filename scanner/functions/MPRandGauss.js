function MPRandGauss(mean, stdDeviation, dtype, truncated, seed) {
	    this.mean = mean;
	    this.stdDev = stdDeviation;
	    this.dtype = dtype;
	    this.nextVal = NaN;
	    this.truncated = truncated;

	    if (this.truncated) {
	      this.upper = this.mean + this.stdDev * 2;
	      this.lower = this.mean - this.stdDev * 2;
	    }

	    var seedValue = seed ? seed : Math.random();
	    this.random = seedrandom_1(seedValue.toString());
	  }