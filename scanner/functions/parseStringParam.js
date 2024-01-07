function parseStringParam(s, keepCase) {
	  var value = Array.isArray(s) ? String.fromCharCode.apply(null, s) : decodeBase64(s);
	  return keepCase ? value : value.toLowerCase();
	}