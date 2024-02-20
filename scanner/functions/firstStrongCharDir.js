function firstStrongCharDir(str) {
	  var strongChar = firstStrongChar(str);
	  if (strongChar == null) {
	    return UnicodeBidiDirection.NEUTRAL;
	  }
	  return REGEX_RTL.exec(strongChar) ? UnicodeBidiDirection.RTL : UnicodeBidiDirection.LTR;
	}