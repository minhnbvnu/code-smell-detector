function translateError(folder, e) {
	    if (e !== null && typeof e === 'object') {
	        var err = e;
	        var p = err.path;
	        if (p) {
	            p = '/' + path.relative(folder, p);
	            err.message = err.message.replace(err.path, p);
	            err.path = p;
	        }
	    }
	    return e;
	}