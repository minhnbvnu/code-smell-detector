function encodeStrings(a) {
	  for (var i = 0; i < a.length; i++) {
	    var val = a[i];

	    if (Array.isArray(val)) {
	      encodeStrings(val);
	    } else {
	      a[i] = encodeString(val);
	    }
	  }

	  return a;
	}