function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }