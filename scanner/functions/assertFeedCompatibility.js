function assertFeedCompatibility(key, val) {
	  // Check dtype compatibility.
	  if (key.dtype == null || key.dtype === val.dtype) {
	    //  a.  If types match, return val tensor as is.
	    return val;
	  }

	  try {
	    //  b. Attempt to convert to expected type.
	    return cast(val, key.dtype);
	  } catch (err) {
	    //  c. If conversion fails, return helpful error.
	    throw new ValueError("The dtype of the feed (" + val.dtype + ") can not be cast to the dtype " + ("of the key '" + key.name + "' (" + key.dtype + ")."));
	  }
	}