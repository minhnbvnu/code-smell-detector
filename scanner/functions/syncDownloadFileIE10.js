function syncDownloadFileIE10(p, type) {
	    var req = new XMLHttpRequest();
	    req.open('GET', p, false);
	    switch (type) {
	        case 'buffer':
	            req.responseType = 'arraybuffer';
	            break;
	        case 'json':
	            // IE10 does not support the JSON type.
	            break;
	        default:
	            throw new ApiError(ErrorCode.EINVAL, "Invalid download type: " + type);
	    }
	    var data;
	    var err;
	    req.onreadystatechange = function (e) {
	        if (req.readyState === 4) {
	            if (req.status === 200) {
	                switch (type) {
	                    case 'buffer':
	                        data = Buffer.from(req.response);
	                        break;
	                    case 'json':
	                        data = JSON.parse(req.response);
	                        break;
	                }
	            }
	            else {
	                err = new ApiError(req.status, "XHR error.");
	            }
	        }
	    };
	    req.send();
	    if (err) {
	        throw err;
	    }
	    return data;
	}