function throwIfNull(gl, returnTOrNull, failureMessage) {
	  var tOrNull = callAndCheck(gl, function () {
	    return returnTOrNull();
	  });

	  if (tOrNull == null) {
	    throw new Error(failureMessage);
	  }

	  return tOrNull;
	}