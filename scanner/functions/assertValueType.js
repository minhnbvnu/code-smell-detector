function assertValueType(type) {
	  function validate(node, key, val) {
	    var valid = getType(val) === type;

	    if (!valid) {
	      throw new TypeError("Property " + key + " expected type of " + type + " but got " + getType(val));
	    }
	  }

	  validate.type = type;

	  return validate;
	}