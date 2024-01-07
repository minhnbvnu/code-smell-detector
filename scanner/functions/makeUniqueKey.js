function makeUniqueKey() {
	  // Collisions are highly unlikely, but this module is in the business of
	  // making guarantees rather than safe bets.
	  do {
	    var uniqueKey = internString(strSlice.call(numToStr.call(rand(), 36), 2));
	  } while (hasOwn.call(uniqueKeys, uniqueKey));
	  return uniqueKeys[uniqueKey] = uniqueKey;
	}