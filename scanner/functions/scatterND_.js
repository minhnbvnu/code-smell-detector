function scatterND_(indices, updates, shape) {
	  var $indices = convertToTensor(indices, 'indices', 'scatterND', 'int32');
	  var $updates = convertToTensor(updates, 'updates', 'scatterND');
	  validateInput($updates, $indices, shape);
	  var inputs = {
	    indices: $indices,
	    updates: $updates
	  };
	  var attrs = {
	    shape: shape
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  return ENGINE.runKernel(ScatterNd, inputs, attrs);
	}