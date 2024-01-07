function addN_(tensors) {
	  assert(Array.isArray(tensors), function () {
	    return 'The argument passed to tf.addN() must be a list of tensors';
	  });
	  assert(tensors.length >= 1, function () {
	    return "Must pass at least one tensor to tf.addN(), but got " + ("" + tensors.length);
	  });
	  var $tensors = tensors.map(function (t, i) {
	    return convertToTensor(t, "tensors" + i, 'addN');
	  });
	  var firstTensor = $tensors[0];
	  $tensors.forEach(function (t) {
	    if (t.dtype !== firstTensor.dtype) {
	      throw new Error('All tensors passed to tf.addN() must have the same dtype');
	    }
	  });
	  $tensors.forEach(function (t) {
	    if (!arraysEqual(t.shape, firstTensor.shape)) {
	      throw new Error('All tensors passed to tf.addN() must have the same shape');
	    }
	  });
	  var inputs = $tensors;
	  return ENGINE.runKernel(AddN, inputs);
	}