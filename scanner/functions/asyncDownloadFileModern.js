function asyncDownloadFileModern(p, type, cb) {
	    var req = new XMLHttpRequest();
	    req.open('GET', p, true);
	    var jsonSupported = true;
	    switch (type) {
	        case 'buffer':
	            req.responseType = 'arraybuffer';
	            break;
	        case 'json':
	            // Some browsers don't support the JSON response type.
	            // They either reset responseType, or throw an exception.
	            // @see https://github.com/Modernizr/Modernizr/blob/master/src/testXhrType.js
	            try {
	                req.responseType = 'json';
	                jsonSupported = req.responseType === 'json';
	            }
	            catch (e) {
	                jsonSupported = false;
	            }
	            break;
	        default:
	            return cb(new ApiError(ErrorCode.EINVAL, "Invalid download type: " + type));
	    }
	    req.onreadystatechange = function (e) {
	        if (req.readyState === 4) {
	            if (req.status === 200) {
	                switch (type) {
	                    case 'buffer':
	                        // XXX: WebKit-based browsers return *null* when XHRing an empty file.
	                        return cb(null, req.response ? Buffer.from(req.response) : emptyBuffer());
	                    case 'json':
	                        if (jsonSupported) {
	                            return cb(null, req.response);
	                        }
	                        else {
	                            return cb(null, JSON.parse(req.responseText));
	                        }
	                }
	            }
	            else {
	                return cb(new ApiError(req.status, "XHR error."));
	            }
	        }
	    };
	    req.send();
	}