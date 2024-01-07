function prod_(x, axis, keepDims) {
	  if (axis === void 0) {
	    axis = null;
	  }

	  if (keepDims === void 0) {
	    keepDims = false;
	  }

	  var $x = convertToTensor(x, 'x', 'prod');

	  if ($x.dtype === 'bool') {
	    // bool is not an allowed type for the underlying kernel.
	    $x = cast($x, 'int32');
	  }

	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    axis: axis,
	    keepDims: keepDims
	  };
	  return ENGINE.runKernel(Prod, inputs, attrs);
	}