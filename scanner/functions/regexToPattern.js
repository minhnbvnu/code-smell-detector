function regexToPattern(regex) {
	    var pattern = regex.toString();
	    return pattern.substring(1, pattern.length - 1);
	  }