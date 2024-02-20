function keyMirror(obj) {
	    Object.keys(obj).forEach(function (k) {
	        return obj[k] = k;
	    });
	    return obj;
	}