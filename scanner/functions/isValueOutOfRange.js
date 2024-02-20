function isValueOutOfRange(value, _ref) {
	  var min = _ref.min,
	      max = _ref.max;

	  return value < min || value > max;
	}