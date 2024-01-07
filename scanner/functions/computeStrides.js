function computeStrides(shape) {
	  var rank = shape.length;

	  if (rank < 2) {
	    return [];
	  } // Last dimension has implicit stride of 1, thus having D-1 (instead of D)
	  // strides.


	  var strides = new Array(rank - 1);
	  strides[rank - 2] = shape[rank - 1];

	  for (var i = rank - 3; i >= 0; --i) {
	    strides[i] = strides[i + 1] * shape[i + 1];
	  }

	  return strides;
	}