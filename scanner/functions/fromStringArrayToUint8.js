function fromStringArrayToUint8(strings) {
	  return strings.map(function (s) {
	    return encodeString(s);
	  });
	}