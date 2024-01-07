function expandDims$1(x, axis) {
	  if (axis === void 0) {
	    axis = -1;
	  }

	  var outShape = x.shape.slice();

	  if (axis < 0) {
	    axis = outShape.length + axis + 1;
	  }

	  outShape.splice(axis, 0, 1);
	  return x.reshape(outShape);
	}