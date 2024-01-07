function gather_(x, indices, axis, batchDims) {
	  if (axis === void 0) {
	    axis = 0;
	  }

	  if (batchDims === void 0) {
	    batchDims = 0;
	  }

	  var $x = convertToTensor(x, 'x', 'gather');
	  var $indices = convertToTensor(indices, 'indices', 'gather', 'int32');
	  var inputs = {
	    x: $x,
	    indices: $indices
	  };
	  var attrs = {
	    axis: axis,
	    batchDims: batchDims
	  };
	  return ENGINE.runKernel(GatherV2, inputs, attrs);
	}