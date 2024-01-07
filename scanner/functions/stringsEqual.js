function stringsEqual(xs, ys) {
	  if (xs == null || ys == null) {
	    return xs === ys;
	  }

	  if (xs.length !== ys.length) {
	    return false;
	  }

	  for (var i = 0; i < xs.length; ++i) {
	    if (xs[i] !== ys[i]) {
	      return false;
	    }
	  }

	  return true;
	}