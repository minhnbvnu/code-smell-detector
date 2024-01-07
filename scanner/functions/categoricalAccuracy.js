function categoricalAccuracy(yTrue, yPred) {
	  return tidy(function () {
	    return cast$1(equal(argMax(yTrue, -1), argMax(yPred, -1)), 'float32');
	  });
	}