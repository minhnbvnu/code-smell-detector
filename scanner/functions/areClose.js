function areClose(a, e, epsilon) {
	  if (!isFinite(a) && !isFinite(e)) {
	    return true;
	  }

	  if (isNaN(a) || isNaN(e) || Math.abs(a - e) > epsilon) {
	    return false;
	  }

	  return true;
	}