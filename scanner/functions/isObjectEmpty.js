function isObjectEmpty(obj) {
	  if (obj == null) {
	    throw new ValueError("Invalid value in obj: " + JSON.stringify(obj));
	  }

	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      return false;
	    }
	  }

	  return true;
	}