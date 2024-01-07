function computeFlatOffset(begin, strides) {
	  var flatOffset = begin.length > 0 ? begin[begin.length - 1] : 1;

	  for (var i = 0; i < begin.length - 1; i++) {
	    flatOffset += begin[i] * strides[i];
	  }

	  return flatOffset;
	}