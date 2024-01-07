function squaredHinge(yTrue, yPred) {
	  return tidy(function () {
	    var maxResult = maximum(0, sub(1, mul(yTrue, yPred)));
	    return mean(square$1(maxResult), -1);
	  });
	}