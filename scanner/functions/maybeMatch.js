function maybeMatch(reg, str) {
	  var m = str.match(reg);
	  return m ? m[0] : null;
	}