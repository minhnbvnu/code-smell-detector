function bincount_(x, weights, size) {
	  var $x = convertToTensor(x, 'x', 'bincount');
	  var $weights = convertToTensor(weights, 'weights', 'bincount');
	  assert($x.dtype === 'int32', function () {
	    return "Error in bincount: input " + ("dtype must be int32, but got " + $x.dtype);
	  });
	  assert(size >= 0, function () {
	    return "size must be non-negative, but got " + size + ".";
	  });
	  assert($weights.size === $x.size || $weights.size === 0, function () {
	    return "Error in bincount: weights must have the same size as input or" + ("0-length, but got input shape: " + $x.shape + ", weights shape: ") + ($weights.shape + ".");
	  });
	  var inputs = {
	    x: $x,
	    weights: $weights
	  };
	  var attrs = {
	    size: size
	  };
	  return ENGINE.runKernel(Bincount, inputs, attrs);
	}