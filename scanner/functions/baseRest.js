function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}