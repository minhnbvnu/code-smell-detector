function poisson(yTrue, yPred) {
	  return tidy(function () {
	    var logPred = log$9(add$1(epsilon(), yPred));
	    return mean(sub(yPred, mul(yTrue, logPred)), -1);
	  });
	}