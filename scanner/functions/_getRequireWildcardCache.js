function _getRequireWildcardCache() {
	  if (typeof WeakMap !== "function") return null;
	  var cache = new WeakMap();

	  _getRequireWildcardCache = function () {
	    return cache;
	  };

	  return cache;
	}