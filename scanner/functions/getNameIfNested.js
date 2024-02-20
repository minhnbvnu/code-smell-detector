function getNameIfNested(str) {
	  var keyIndex = str.indexOf(NAME_KEY_SEP);
	  var arrayIndex = str.indexOf(NAME_INDEX_OPEN_SEP);

	  var index = void 0;

	  if (keyIndex === -1 && arrayIndex === -1) {
	    return {
	      name: str
	    };
	  } else if (keyIndex === -1) {
	    index = arrayIndex;
	  } else if (arrayIndex === -1) {
	    index = keyIndex;
	  } else {
	    index = Math.min(keyIndex, arrayIndex);
	  }

	  return {
	    name: str.slice(0, index),
	    isNested: true
	  };
	}