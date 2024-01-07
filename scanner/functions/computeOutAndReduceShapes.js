function computeOutAndReduceShapes(aShape, axes) {
	  var outShape = [];
	  var rank = aShape.length;

	  for (var dim = 0; dim < rank; dim++) {
	    if (axes.indexOf(dim) === -1) {
	      outShape.push(aShape[dim]);
	    }
	  }

	  var reduceShape = axes.map(function (dim) {
	    return aShape[dim];
	  });
	  return [outShape, reduceShape];
	}