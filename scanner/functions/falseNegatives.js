function falseNegatives(yTrue, yPred) {
	  return tidy(function () {
	    return logicalAnd(yTrue.equal(1), yPred.equal(0)).sum().cast('float32');
	  });
	}