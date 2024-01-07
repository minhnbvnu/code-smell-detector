function categoricalHinge(yTrue, yPred) {
	  return tidy(function () {
	    var pos = sum$1(mul(yTrue, yPred), -1);
	    var neg = max$4(mul(sub(1, yTrue), yPred), -1);
	    return maximum(0, add$1(1, sub(neg, pos)));
	  });
	}