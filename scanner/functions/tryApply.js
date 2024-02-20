function tryApply(f, s, a) {
	  try {
	    f.apply(s, a);
	  } catch (error) {
	    ERROR.value = error;
	    return ERROR;
	  }
	}