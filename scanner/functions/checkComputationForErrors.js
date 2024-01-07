function checkComputationForErrors(vals, dtype, kernelName) {
	  if (dtype !== 'float32') {
	    // Only floating point computations will generate NaN values
	    return false;
	  }

	  for (var i = 0; i < vals.length; i++) {
	    var num = vals[i];

	    if (isNaN(num) || !isFinite(num)) {
	      // Throwing custom exception so behavior is testable.
	      console.warn("Found " + num + " in the result of '" + kernelName + "'");
	      return true;
	    }
	  }

	  return false;
	}