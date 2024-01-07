function zipToList(x) {
	  if (x === null) {
	    return null;
	  } // TODO(soergel): validate array type?


	  if (isIterable$1(x[0])) {
	    return {
	      value: null,
	      recurse: true
	    };
	  } else {
	    return {
	      value: x,
	      recurse: false
	    };
	  }
	}