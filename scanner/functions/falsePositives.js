function falsePositives(yTrue, yPred) {
	  return tidy(function () {
	    return logicalAnd(yTrue.equal(0), yPred.equal(1)).sum().cast('float32');
	  });
	}