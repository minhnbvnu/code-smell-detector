function pyListRepeat(value, numValues) {
	  if (Array.isArray(value)) {
	    // tslint:disable-next-line:no-any
	    var newArray = [];

	    for (var i = 0; i < numValues; i++) {
	      newArray = newArray.concat(value);
	    }

	    return newArray;
	  } else {
	    var _newArray = new Array(numValues);

	    _newArray.fill(value);

	    return _newArray;
	  }
	}