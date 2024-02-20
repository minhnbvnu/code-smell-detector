function decodeCodePointsArray$1(codePoints) {
	  var len = codePoints.length;

	  if (len <= MAX_ARGUMENTS_LENGTH$1) {
	    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
	  } // Decode in chunks to avoid "call stack size exceeded".


	  var res = '';
	  var i = 0;

	  while (i < len) {
	    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH$1));
	  }

	  return res;
	}