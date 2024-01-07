function meanSquaredLogarithmicError(yTrue, yPred) {
	  return tidy(function () {
	    var clippedPred = clipByValue(yPred, epsilon(), Number.MAX_VALUE);
	    var firstLog = log$9(add$1(1, clippedPred));
	    var clippedTrue = clipByValue(yTrue, epsilon(), Number.MAX_VALUE);
	    var secondLog = log$9(add$1(1, clippedTrue));
	    return mean(square$1(sub(firstLog, secondLog)), -1);
	  });
	}