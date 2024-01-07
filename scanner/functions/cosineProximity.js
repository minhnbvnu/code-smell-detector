function cosineProximity(yTrue, yPred) {
	  return tidy(function () {
	    var trueNormalized = l2Normalize(yTrue, -1);
	    var predNormalized = l2Normalize(yPred, -1);
	    var trueXPred = mul(trueNormalized, predNormalized);
	    return neg(sum$1(trueXPred, -1));
	  });
	}