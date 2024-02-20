function noError(e, cb) {
	    if (e) {
	        cb(e);
	        return false;
	    }
	    return true;
	}