function _set(target, property, value, receiver, isStrict) {
	  var s = set$4(target, property, value, receiver || target);

	  if (!s && isStrict) {
	    throw new Error('failed to set property');
	  }

	  return value;
	}