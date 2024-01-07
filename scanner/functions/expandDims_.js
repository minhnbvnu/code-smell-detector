function expandDims_(x, axis) {
	  if (axis === void 0) {
	    axis = 0;
	  }

	  var $x = convertToTensor(x, 'x', 'expandDims', 'string_or_numeric');
	  assert(axis <= $x.rank, function () {
	    return 'Axis must be <= rank of the tensor';
	  });
	  var inputs = {
	    input: $x
	  };
	  var attrs = {
	    dim: axis
	  };
	  return ENGINE.runKernel(ExpandDims, inputs, attrs);
	}