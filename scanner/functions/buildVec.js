function buildVec(x) {
	  if (x.length === 1) {
	    return "" + x[0];
	  }

	  return "vec" + x.length + "(" + x.join(',') + ")";
	}