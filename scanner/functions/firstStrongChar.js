function firstStrongChar(str) {
	  var match = REGEX_STRONG.exec(str);
	  return match == null ? null : match[0];
	}