function topKImpl(x, xShape, xDtype, k, sorted) {
	  // Reshape into a 2d tensor [batch, lastDim] and compute topk along lastDim.
	  var lastDim = xShape[xShape.length - 1];
	  var batch = x.length / lastDim,
	      size = lastDim;
	  var allTopKVals = getTypedArrayFromDType(xDtype, batch * k);
	  var allTopKIndices = getTypedArrayFromDType('int32', batch * k);

	  for (var b = 0; b < batch; b++) {
	    var offset = b * size;
	    var vals = x.subarray(offset, offset + size);
	    var valAndInd = [];

	    for (var i = 0; i < vals.length; i++) {
	      valAndInd.push({
	        value: vals[i],
	        index: i
	      });
	    }

	    valAndInd.sort(function (a, b) {
	      return b.value - a.value;
	    });
	    var outOffset = b * k;
	    var topKVals = allTopKVals.subarray(outOffset, outOffset + k);
	    var topKIndices = allTopKIndices.subarray(outOffset, outOffset + k);

	    for (var _i = 0; _i < k; _i++) {
	      topKVals[_i] = valAndInd[_i].value;
	      topKIndices[_i] = valAndInd[_i].index;
	    }
	  } // Reshape back to the original input shape, except that the last
	  // dimension is k.


	  var outputShape = xShape.slice();
	  outputShape[outputShape.length - 1] = k;
	  return [buffer(outputShape, xDtype, allTopKVals), buffer(outputShape, 'int32', allTopKIndices)];
	}