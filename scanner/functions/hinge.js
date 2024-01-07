function hinge(yTrue, yPred) {
	  return tidy(function () {
	    var maxResult = maximum(0, sub(1, mul(yTrue, yPred)));
	    return mean(maxResult, -1);
	  });
	}