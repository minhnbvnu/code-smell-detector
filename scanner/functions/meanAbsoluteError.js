function meanAbsoluteError(yTrue, yPred) {
	  return tidy(function () {
	    return mean(abs$8(sub(yPred, yTrue)), -1);
	  });
	}