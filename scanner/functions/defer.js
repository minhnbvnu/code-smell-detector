function defer( fn, wait ) {
	        // Allow 0 to be passed
	        setTimeout( fn, +wait >= 0 ? wait : 1 );
	    }