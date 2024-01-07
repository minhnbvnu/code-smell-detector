function rightPad(a, size) {
	  if (size <= a.length) {
	    return a;
	  }

	  return a + ' '.repeat(size - a.length);
	}