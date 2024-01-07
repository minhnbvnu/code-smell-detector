function expandShapeToKeepDim(shape, axes) {
	  var reduceSubShape = axes.map(function (x) {
	    return 1;
	  });
	  return combineLocations(shape, reduceSubShape, axes);
	}