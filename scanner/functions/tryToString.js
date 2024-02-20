function tryToString(buff, encoding, cb) {
	    try {
	        cb(null, buff.toString(encoding));
	    }
	    catch (e) {
	        cb(e);
	    }
	}