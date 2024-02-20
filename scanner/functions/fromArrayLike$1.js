function fromArrayLike$1(that, array) {
	  var length = array.length < 0 ? 0 : checked$1(array.length) | 0;
	  that = createBuffer$1(that, length);

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }

	  return that;
	}