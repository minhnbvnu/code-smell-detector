function getThen$1(obj) {
	  try {
	    return obj.then;
	  } catch (error) {
	    ERROR.value = error;
	    return ERROR;
	  }
	}