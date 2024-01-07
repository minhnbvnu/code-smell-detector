function denseBincount_(x, weights, size, binaryOutput) {
	  if (binaryOutput === void 0) {
	    binaryOutput = false;
	  }

	  var $x = convertToTensor(x, 'x', 'denseBincount');
	  var $weights = convertToTensor(weights, 'weights', 'denseBincount');
	  assert($x.dtype === 'int32', function () {
	    return "Error in denseBincount: input " + ("dtype must be int32, but got " + $x.dtype);
	  });
	  assert($x.rank <= 2, function () {
	    return "Error in denseBincount: input must be at most rank 2, but got " + ("rank " + $x.rank + ".");
	  });
	  assert(size >= 0, function () {
	    return "size must be non-negative, but got " + size + ".";
	  });
	  assert($weights.size === $x.size || $weights.size === 0, function () {
	    return "Error in denseBincount: weights must have the same shape as x or " + ("0-length, but got x shape: " + $x.shape + ", weights shape: ") + ($weights.shape + ".");
	  });
	  var inputs = {
	    x: $x,
	    weights: $weights
	  };
	  var attrs = {
	    size: size,
	    binaryOutput: binaryOutput
	  };
	  return ENGINE.runKernel(DenseBincount, inputs, attrs);
	}