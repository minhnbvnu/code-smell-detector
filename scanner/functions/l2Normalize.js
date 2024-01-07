function l2Normalize(x, axis) {
	  return tidy(function () {
	    if (x.dtype !== 'float32') {
	      x = x.asType('float32');
	    }

	    var squareSum = sum$1(square$1(x), axis, true);
	    var epsilonTensor = fill(squareSum.shape, epsilon());
	    var norm = sqrt$3(maximum(squareSum, epsilonTensor));
	    return div(x, norm);
	  });
	}