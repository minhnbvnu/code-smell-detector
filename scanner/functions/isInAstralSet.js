function isInAstralSet(code, set) {
	  var pos = 0x10000;
	  for (var i = 0; i < set.length; i += 2) {
	    pos += set[i];
	    if (pos > code) return false;

	    pos += set[i + 1];
	    if (pos >= code) return true;
	  }
	}