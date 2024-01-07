function arraysEqual(n1, n2) {
	  if (n1 === n2) {
	    return true;
	  }

	  if (n1 == null || n2 == null) {
	    return false;
	  }

	  if (n1.length !== n2.length) {
	    return false;
	  }

	  for (var i = 0; i < n1.length; i++) {
	    if (n1[i] !== n2[i]) {
	      return false;
	    }
	  }

	  return true;
	}