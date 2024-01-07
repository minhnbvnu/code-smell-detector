function meanSquaredError$1(yTrue, yPred) {
	  return tidy(function () {
	    return mean(square$1(sub(yPred, yTrue)), -1);
	  });
	}