function getFileSizeSync(p) {
	    var rv = -1;
	    getFileSize(false, p, function (err, size) {
	        if (err) {
	            throw err;
	        }
	        rv = size;
	    });
	    return rv;
	}