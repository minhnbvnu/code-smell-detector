function getBroadcastDims(inShape, outShape) {
	  var inRank = inShape.length;
	  var dims = [];

	  for (var i = 0; i < inRank; i++) {
	    var dim = inRank - 1 - i;
	    var a = inShape[dim] || 1;
	    var b = outShape[outShape.length - 1 - i] || 1;

	    if (b > 1 && a === 1) {
	      dims.unshift(dim);
	    }
	  }

	  return dims;
	}