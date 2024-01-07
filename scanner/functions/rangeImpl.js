function rangeImpl(start, stop, step, dtype) {
	  var sameStartStop = start === stop;
	  var increasingRangeNegativeStep = start < stop && step < 0;
	  var decreasingRangePositiveStep = stop < start && step > 1;

	  if (sameStartStop || increasingRangeNegativeStep || decreasingRangePositiveStep) {
	    return makeZerosTypedArray(0, dtype);
	  }

	  var numElements = Math.abs(Math.ceil((stop - start) / step));
	  var values = makeZerosTypedArray(numElements, dtype);

	  if (stop < start && step === 1) {
	    // Auto adjust the step's sign if it hasn't been set
	    // (or was set to 1)
	    step = -1;
	  }

	  values[0] = start;

	  for (var i = 1; i < values.length; i++) {
	    values[i] = values[i - 1] + step;
	  }

	  return values;
	}