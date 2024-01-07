function range(start, stop, step, dtype) {
	  if (step === void 0) {
	    step = 1;
	  }

	  if (dtype === void 0) {
	    dtype = 'float32';
	  }

	  if (step === 0) {
	    throw new Error('Cannot have a step of zero');
	  }

	  var attrs = {
	    start: start,
	    stop: stop,
	    step: step,
	    dtype: dtype
	  };
	  return ENGINE.runKernel(Range, {}
	  /* inputs */
	  , attrs);
	}