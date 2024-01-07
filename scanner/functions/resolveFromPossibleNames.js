function resolveFromPossibleNames(possibleNames, dirname) {
	  return possibleNames.reduce(function (accum, curr) {
	    return accum || (0, _resolve2.default)(curr, dirname);
	  }, null);
	}