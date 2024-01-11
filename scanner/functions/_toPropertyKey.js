function _toPropertyKey(arg) {
	  var key = _toPrimitive(arg, "string");

	  return typeof key === "symbol" ? key : String(key);
	}