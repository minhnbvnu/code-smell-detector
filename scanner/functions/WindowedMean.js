function WindowedMean(windowSize) {
	      if (windowSize === void 0) {
	        windowSize = 32;
	      }
	      this.addedValues = 0;
	      this.lastValue = 0;
	      this.mean = 0;
	      this.dirty = true;
	      this.values = new Array(windowSize);
	    }