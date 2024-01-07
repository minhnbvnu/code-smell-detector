function _optionalCallableProperty(obj, name) {
	  var value = obj[name];

	  if (value !== undefined && typeof value !== "function") {
	    throw new TypeError("Expected '" + name + "' to be a function");
	  }

	  return value;
	}