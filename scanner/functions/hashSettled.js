function hashSettled(object, label) {
	  if (!isObject(object)) {
	    return Promise.reject(new TypeError("RSVP.hashSettled must be called with an object"), label);
	  }

	  return new HashSettled(Promise, object, false, label).promise;
	}