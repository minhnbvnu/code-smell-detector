function topk_(x, k, sorted) {
	  if (k === void 0) {
	    k = 1;
	  }

	  if (sorted === void 0) {
	    sorted = true;
	  }

	  var $x = convertToTensor(x, 'x', 'topk');

	  if ($x.rank === 0) {
	    throw new Error('topk() expects the input to be of rank 1 or higher');
	  }

	  var lastDim = $x.shape[$x.shape.length - 1];

	  if (k > lastDim) {
	    throw new Error("'k' passed to topk() must be <= the last dimension (" + lastDim + ") " + ("but got " + k));
	  }

	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    k: k,
	    sorted: sorted
	  };

	  var _ENGINE$runKernel = ENGINE.runKernel(TopK, inputs, attrs),
	      values = _ENGINE$runKernel[0],
	      indices = _ENGINE$runKernel[1];

	  return {
	    values: values,
	    indices: indices
	  };
	}