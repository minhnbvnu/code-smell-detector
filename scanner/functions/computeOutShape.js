function computeOutShape(begin, end, strides) {
	  var size = [];

	  for (var axis = 0; axis < begin.length; axis++) {
	    size[axis] = Math.ceil((end[axis] - begin[axis]) / strides[axis]);
	  }

	  return size;
	}