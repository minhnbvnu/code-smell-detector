function needsPromiseInput(arg) {
	  if (arg && typeof arg === 'object') {
	    if (arg.constructor === Promise) {
	      return true;
	    } else {
	      return getThen$1(arg);
	    }
	  } else {
	    return false;
	  }
	}