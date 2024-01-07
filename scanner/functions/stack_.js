function stack_(tensors, axis) {
	  if (axis === void 0) {
	    axis = 0;
	  }

	  var $tensors = convertToTensorArray(tensors, 'tensors', 'stack', 'string_or_numeric');
	  assert($tensors.length >= 1, function () {
	    return 'Pass at least one tensor to tf.stack';
	  });

	  if ($tensors.length > 0) {
	    assert(axis <= $tensors[0].rank, function () {
	      return 'Axis must be <= rank of the tensor';
	    });
	  }

	  var inputs = $tensors;
	  var attrs = {
	    axis: axis
	  };
	  return ENGINE.runKernel(Pack, inputs, attrs);
	}