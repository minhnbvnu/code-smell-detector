function nearestDivisor(size, start) {
	  for (var i = start; i < size; ++i) {
	    if (size % i === 0) {
	      return i;
	    }
	  }

	  return size;
	}