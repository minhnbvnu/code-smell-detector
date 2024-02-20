function generateRandomKey() {
	  var key = void 0;
	  while (key === undefined || seenKeys.hasOwnProperty(key) || !isNaN(+key)) {
	    key = Math.floor(Math.random() * MULTIPLIER).toString(32);
	  }
	  seenKeys[key] = true;
	  return key;
	}