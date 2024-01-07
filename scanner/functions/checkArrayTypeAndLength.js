function checkArrayTypeAndLength(x, expectedType, minLength, maxLength) {
	  if (minLength === void 0) {
	    minLength = 0;
	  }

	  if (maxLength === void 0) {
	    maxLength = Infinity;
	  }

	  assert$1(minLength >= 0);
	  assert$1(maxLength >= minLength);
	  return Array.isArray(x) && x.length >= minLength && x.length <= maxLength && x.every(function (e) {
	    return typeof e === expectedType;
	  });
	}