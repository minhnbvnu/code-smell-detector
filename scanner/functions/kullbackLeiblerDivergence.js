function kullbackLeiblerDivergence(yTrue, yPred) {
	  return tidy(function () {
	    var clippedTrue = clipByValue(yTrue, epsilon(), 1);
	    var clippedPred = clipByValue(yPred, epsilon(), 1);
	    return sum$1(mul(yTrue, log$9(div(clippedTrue, clippedPred))), -1);
	  });
	}