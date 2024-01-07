function tile$1(x, n) {
	  if (!Array.isArray(n)) {
	    n = [n];
	  }

	  if (x.rank !== n.length) {
	    throw new ValueError("The length of input n (" + n.length + ") does not match " + ("the number of dimensions in input x (" + x.rank + ")"));
	  }

	  return tile(x, n);
	}