function charSet(s) {
	  return s.split('').reduce(function (set, c) {
	    set[c] = true;
	    return set;
	  }, {});
	}