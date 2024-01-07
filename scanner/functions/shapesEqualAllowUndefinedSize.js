function shapesEqualAllowUndefinedSize(n1, n2) {
	  if (n1.length !== n2.length) {
	    return false;
	  }

	  for (var i = 0; i < n1.length; i++) {
	    if (n1[i] !== -1 && n2[i] !== -1 && n1[i] !== n2[i]) {
	      return false;
	    }
	  }

	  return true;
	}