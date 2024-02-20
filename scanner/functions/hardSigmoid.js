function hardSigmoid(x) {
	  return tidy(function () {
	    var y = add$1(.5, mul(.2, x));
	    return clipByValue(y, 0, 1);
	  });
	}