function errorRemote2Local(e) {
	    var cnstr = global$1[e.name];
	    if (typeof (cnstr) !== 'function') {
	        cnstr = Error;
	    }
	    var err = new cnstr(e.message);
	    err.stack = e.stack;
	    return err;
	}