function defineKey(key) {
	    if (processProxy[key]) {
	        // Probably a builtin Object property we don't care about.
	        return;
	    }
	    if (typeof process[key] === 'function') {
	        processProxy[key] = function () {
	            return process[key].apply(process, arguments);
	        };
	    }
	    else {
	        processProxy[key] = process[key];
	    }
	}