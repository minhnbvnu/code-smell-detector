function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}