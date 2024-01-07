function binaryAccuracy(yTrue, yPred) {
	  return tidy(function () {
	    var threshold = mul(.5, onesLike(yPred));
	    var yPredThresholded = cast$1(greater(yPred, threshold), yTrue.dtype);
	    return mean(equal(yTrue, yPredThresholded), -1);
	  });
	}