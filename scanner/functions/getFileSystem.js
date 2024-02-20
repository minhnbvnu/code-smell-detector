function getFileSystem(config, cb) {
	    var fsName = config['fs'];
	    if (!fsName) {
	        return cb(new ApiError(ErrorCode.EPERM, 'Missing "fs" property on configuration object.'));
	    }
	    var options = config['options'];
	    var waitCount = 0;
	    var called = false;
	    function finish() {
	        if (!called) {
	            called = true;
	            var fsc = Backends[fsName];
	            if (!fsc) {
	                cb(new ApiError(ErrorCode.EPERM, ("File system " + fsName + " is not available in BrowserFS.")));
	            }
	            else {
	                fsc.Create(options, cb);
	            }
	        }
	    }
	    if (options !== null && typeof (options) === "object") {
	        var finishedIterating = false;
	        var props = Object.keys(options).filter(function (k) { return k !== 'fs'; });
	        // Check recursively if other fields have 'fs' properties.
	        props.forEach(function (p) {
	            var d = options[p];
	            if (d !== null && typeof (d) === "object" && d['fs']) {
	                waitCount++;
	                getFileSystem(d, function (e, fs) {
	                    waitCount--;
	                    if (e) {
	                        if (called) {
	                            return;
	                        }
	                        called = true;
	                        cb(e);
	                    }
	                    else {
	                        options[p] = fs;
	                        if (waitCount === 0 && finishedIterating) {
	                            finish();
	                        }
	                    }
	                });
	            }
	        });
	        finishedIterating = true;
	    }
	    if (waitCount === 0) {
	        finish();
	    }
	}