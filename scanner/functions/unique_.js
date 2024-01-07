function unique_(x, axis) {
	  if (axis === void 0) {
	    axis = 0;
	  }

	  var $x = convertToTensor(x, 'x', 'unique', 'string_or_numeric');
	  assert($x.rank > 0, function () {
	    return 'The input tensor must be at least 1D';
	  });
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    axis: axis
	  };

	  var _ENGINE$runKernel = ENGINE.runKernel(Unique, inputs, attrs),
	      values = _ENGINE$runKernel[0],
	      indices = _ENGINE$runKernel[1];

	  return {
	    values: values,
	    indices: indices
	  };
	}