function truePositives(yTrue, yPred) {
	  return tidy(function () {
	    return logicalAnd(yTrue.equal(1), yPred.equal(1)).sum().cast('float32');
	  });
	}