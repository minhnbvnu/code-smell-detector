function getReductionAxes(inShape, outShape) {
	  var result = [];

	  for (var i = 0; i < outShape.length; i++) {
	    var inDim = inShape[inShape.length - i - 1];
	    var outAxis = outShape.length - i - 1;
	    var outDim = outShape[outAxis];

	    if (inDim == null || inDim === 1 && outDim > 1) {
	      result.unshift(outAxis);
	    }
	  }

	  return result;
	}