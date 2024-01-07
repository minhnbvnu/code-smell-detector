function recall(yTrue, yPred) {
	  return tidy(function () {
	    var tp = truePositives(yTrue, yPred);
	    var fn = falseNegatives(yTrue, yPred);
	    var denominator = tp.add(fn);
	    return where(greater(denominator, 0), tp.div(denominator), 0).cast('float32');
	  });
	}