function assertOneOf() {
	  for (var _len = arguments.length, vals = Array(_len), _key = 0; _key < _len; _key++) {
	    vals[_key] = arguments[_key];
	  }

	  function validate(node, key, val) {
	    if (vals.indexOf(val) < 0) {
	      throw new TypeError("Property " + key + " expected value to be one of " + (0, _stringify2.default)(vals) + " but got " + (0, _stringify2.default)(val));
	    }
	  }

	  validate.oneOf = vals;

	  return validate;
	}