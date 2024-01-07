function concat_(tensors, axis) {
	  if (axis === void 0) {
	    axis = 0;
	  }

	  assert(tensors.length >= 1, function () {
	    return 'Pass at least one tensor to concat';
	  });
	  var $tensors = convertToTensorArray(tensors, 'tensors', 'concat', 'string_or_numeric');

	  if ($tensors[0].dtype === 'complex64') {
	    $tensors.forEach(function (tensor) {
	      if (tensor.dtype !== 'complex64') {
	        throw new Error("Cannot concatenate complex64 tensors with a tensor\n          with dtype " + tensor.dtype + ". ");
	      }
	    });
	  }

	  if ($tensors.length === 1) {
	    return clone($tensors[0]);
	  }

	  var inputs = $tensors;
	  var attr = {
	    axis: axis
	  };
	  return ENGINE.runKernel(Concat, inputs, attr);
	}