function normalizeShapeList(x) {
	  if (x.length === 0) {
	    return [];
	  }

	  if (!Array.isArray(x[0])) {
	    return [x];
	  }

	  return x;
	}