function ensureValueInRange(val, _ref3) {
	  var max = _ref3.max,
	      min = _ref3.min;

	  if (val <= min) {
	    return min;
	  }
	  if (val >= max) {
	    return max;
	  }
	  return val;
	}