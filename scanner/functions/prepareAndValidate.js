function prepareAndValidate(tensor, indices) {
	  var tensorRank = tensor.shape.length;
	  var indicesRank = indices.shape.length;

	  if (tensorRank < 1) {
	    throw new Error('tf.gatherND() expects the input to be rank 1 or higher,' + (" but the rank was " + tensorRank + "."));
	  }

	  if (indicesRank < 1) {
	    throw new Error('tf.gatherND() expects the indices to be rank 1 or higher,' + (" but the rank was " + indicesRank + "."));
	  }

	  if (indices.dtype !== 'int32') {
	    throw new Error('tf.gatherND() expects the indices to be int32 type,' + (" but the dtype was " + indices.dtype + "."));
	  }

	  if (indices.shape[indicesRank - 1] > tensorRank) {
	    throw new Error('index innermost dimension length must be <= tensor rank; saw: ' + (indices.shape[indicesRank - 1] + " vs. " + tensorRank));
	  }

	  if (sizeFromShape(tensor.shape) === 0) {
	    throw new Error('Requested more than 0 entries, but input is empty.' + (" Input shape: " + tensor.shape + "."));
	  }

	  var indicesShape = indices.shape;
	  var sliceRank = indicesShape[indicesShape.length - 1]; // The result shape is
	  //   indices.shape[:-1] + params.shape[indices.shape[-1]:]

	  var nResult = 1;

	  for (var i = 0; i < indicesShape.length - 1; ++i) {
	    nResult *= indicesShape[i];
	  }

	  var inputShape = tensor.shape;
	  var resultShape = indicesShape.slice();
	  resultShape.pop();
	  var sliceSize = 1;

	  for (var _i = sliceRank; _i < tensorRank; ++_i) {
	    sliceSize *= inputShape[_i];
	    resultShape.push(inputShape[_i]);
	  }

	  var strides = [].concat(computeStrides(tensor.shape).map(function (stride) {
	    return stride / sliceSize;
	  }), [1]).slice(0, sliceRank);
	  return [resultShape, nResult, sliceSize, strides];
	}