function computeOutShape$1(shapes, axis) {
	  var outputShape = shapes[0].slice();

	  for (var i = 1; i < shapes.length; i++) {
	    outputShape[axis] += shapes[i][axis];
	  }

	  return outputShape;
	}