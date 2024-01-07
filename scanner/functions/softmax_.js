function softmax_(logits, dim) {
	  if (dim === void 0) {
	    dim = -1;
	  }

	  var $logits = convertToTensor(logits, 'logits', 'softmax', 'float32');

	  if (dim === -1) {
	    dim = $logits.rank - 1;
	  }

	  if (dim !== $logits.rank - 1) {
	    throw Error('Softmax along a non-last dimension is not yet supported. ' + ("Logits was rank " + $logits.rank + " and dim was " + dim));
	  }

	  var inputs = {
	    logits: $logits
	  };
	  var attrs = {
	    dim: dim
	  };
	  return ENGINE.runKernel(Softmax, inputs, attrs);
	}