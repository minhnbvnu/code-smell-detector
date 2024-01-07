function binaryCrossentropy(yTrue, yPred) {
	  return tidy(function () {
	    var y;
	    y = clipByValue(yPred, epsilon(), 1 - epsilon());
	    y = log$9(div(y, sub(1, y)));
	    return mean(sigmoidCrossEntropyWithLogits(yTrue, y), -1);
	  });
	}