function UniformRandom(min, max, dtype, seed) {
	    var _this = this;

	    if (min === void 0) {
	      min = 0;
	    }

	    if (max === void 0) {
	      max = 1;
	    }

	    /** Handles proper rounding for non floating point numbers. */
	    this.canReturnFloat = function () {
	      return _this.dtype == null || _this.dtype === 'float32';
	    };

	    this.min = min;
	    this.range = max - min;
	    this.dtype = dtype;

	    if (seed == null) {
	      seed = Math.random();
	    }

	    if (typeof seed === 'number') {
	      seed = seed.toString();
	    }

	    if (!this.canReturnFloat() && this.range <= 1) {
	      throw new Error("The difference between " + min + " - " + max + " <= 1 and dtype is not float");
	    }

	    this.random = seedrandom_1(seed);
	  }