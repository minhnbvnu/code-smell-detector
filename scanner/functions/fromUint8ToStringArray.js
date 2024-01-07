function fromUint8ToStringArray(vals) {
	  try {
	    // Decode the bytes into string.
	    return vals.map(function (val) {
	      return decodeString(val);
	    });
	  } catch (err) {
	    throw new Error("Failed to decode encoded string bytes into utf-8, error: " + err);
	  }
	}