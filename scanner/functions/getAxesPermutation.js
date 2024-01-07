function getAxesPermutation(axes, rank) {
	  if (axesAreInnerMostDims(axes, rank)) {
	    return null;
	  }

	  var result = [];

	  for (var i = 0; i < rank; ++i) {
	    if (axes.indexOf(i) === -1) {
	      result.push(i);
	    }
	  }

	  axes.forEach(function (axis) {
	    return result.push(axis);
	  });
	  return result;
	}