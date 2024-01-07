function logcosh(yTrue, yPred) {
	  return tidy(function () {
	    var log2 = Math.log(2);
	    var predictionDiff = sub(yPred, yTrue);
	    var logcoshResult = sub(add$1(predictionDiff, softplus(mul(-2, predictionDiff))), log2);
	    return mean(logcoshResult, -1);
	  });
	}