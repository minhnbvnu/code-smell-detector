function meanAbsolutePercentageError(yTrue, yPred) {
	  return tidy(function () {
	    var diff = sub(yTrue, yPred);
	    var clippedTrue = clipByValue(abs$8(yTrue), epsilon(), Number.MAX_VALUE);
	    var absResult = abs$8(div(diff, clippedTrue));
	    return mul(100, mean(absResult, -1));
	  });
	}