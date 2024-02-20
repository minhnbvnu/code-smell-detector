function now() {

    	return ( typeof performance === 'undefined' ? Date : performance ).now(); // see #10732

    }