function syncDownloadFileModern(p, type) {
	    var req = new XMLHttpRequest();
	    req.open('GET', p, false);
	    // On most platforms, we cannot set the responseType of synchronous downloads.
	    // @todo Test for this; IE10 allows this, as do older versions of Chrome/FF.
	    var data = null;
	    var err = null;
	    // Classic hack to download binary data as a string.
	    req.overrideMimeType('text/plain; charset=x-user-defined');
	    req.onreadystatechange = function (e) {
	        if (req.readyState === 4) {
	            if (req.status === 200) {
	                switch (type) {
	                    case 'buffer':
	                        // Convert the text into a buffer.
	                        var text = req.responseText;
	                        data = Buffer.alloc(text.length);
	                        // Throw away the upper bits of each character.
	                        for (var i = 0; i < text.length; i++) {
	                            // This will automatically throw away the upper bit of each
	                            // character for us.
	                            data[i] = text.charCodeAt(i);
	                        }
	                        return;
	                    case 'json':
	                        data = JSON.parse(req.responseText);
	                        return;
	                }
	            }
	            else {
	                err = new ApiError(req.status, "XHR error.");
	                return;
	            }
	        }
	    };
	    req.send();
	    if (err) {
	        throw err;
	    }
	    return data;
	}