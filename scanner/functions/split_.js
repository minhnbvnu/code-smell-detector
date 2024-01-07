function split_(x, numOrSizeSplits, axis) {
	  if (axis === void 0) {
	    axis = 0;
	  }

	  var $x = convertToTensor(x, 'x', 'split');
	  var inputs = {
	    x: $x
	  };
	  var attr = {
	    numOrSizeSplits: numOrSizeSplits,
	    axis: axis
	  };
	  return ENGINE.runKernel(SplitV, inputs, attr);
	}