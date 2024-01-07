function repeat(x, n) {
	  return tidy(function () {
	    if (x.shape.length !== 2) {
	      throw new ValueError("repeat() expects a rank-2 tensor, but received a " + ("rank-" + x.shape.length + " tensor."));
	    }

	    var y = expandDims$1(x, 1);
	    return tile$1(y, [1, n, 1]);
	  });
	}