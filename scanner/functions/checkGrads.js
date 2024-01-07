function checkGrads(grads) {
	  var numNullGradients = grads.filter(function (g) {
	    return g == null;
	  }).length;

	  if (numNullGradients > 0) {
	    throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that\n    the f you passed encloses all operations that lead from x to y.");
	  }
	}