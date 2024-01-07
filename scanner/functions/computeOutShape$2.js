function computeOutShape$2(aShape, axis, numSegments) {
	  var outShape = [];
	  var rank = aShape.length;

	  for (var dim = 0; dim < rank; dim++) {
	    if (dim !== axis) {
	      outShape.push(aShape[dim]);
	    } else {
	      outShape.push(numSegments);
	    }
	  }

	  return outShape;
	}