function precision(yTrue, yPred) {
	  return tidy(function () {
	    var tp = truePositives(yTrue, yPred);
	    var fp = falsePositives(yTrue, yPred);
	    var denominator = tp.add(fp);
	    return where(greater(denominator, 0), tp.div(denominator), 0).cast('float32');
	  });
	}