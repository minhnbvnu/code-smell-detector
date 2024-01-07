function gatherND_(x, indices) {
	  var $indices = convertToTensor(indices, 'indices', 'gatherND', 'int32');
	  var $x = convertToTensor(x, 'x', 'gatherND');
	  var inputs = {
	    params: $x,
	    indices: $indices
	  };
	  return ENGINE.runKernel(GatherNd, inputs);
	}