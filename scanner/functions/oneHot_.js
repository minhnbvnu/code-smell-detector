function oneHot_(indices, depth, onValue, offValue) {
	  if (onValue === void 0) {
	    onValue = 1;
	  }

	  if (offValue === void 0) {
	    offValue = 0;
	  }

	  if (depth < 2) {
	    throw new Error("Error in oneHot: depth must be >=2, but it is " + depth);
	  }

	  var $indices = convertToTensor(indices, 'indices', 'oneHot', 'int32');
	  var inputs = {
	    indices: $indices
	  };
	  var attrs = {
	    depth: depth,
	    onValue: onValue,
	    offValue: offValue
	  };
	  return ENGINE.runKernel(OneHot, inputs, attrs);
	}