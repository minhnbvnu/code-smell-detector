function argLocal2Remote(arg, requestArgs, cb) {
	            switch (typeof arg) {
	                case 'object':
	                    if (arg instanceof Stats) {
	                        cb(null, statsLocal2Remote(arg));
	                    }
	                    else if (arg instanceof ApiError) {
	                        cb(null, apiErrorLocal2Remote(arg));
	                    }
	                    else if (arg instanceof BaseFile) {
	                        // Pass in p and flags from original request.
	                        cb(null, fdConverter.toRemoteArg(arg, requestArgs[0], requestArgs[1], cb));
	                    }
	                    else if (arg instanceof FileFlag) {
	                        cb(null, fileFlagLocal2Remote(arg));
	                    }
	                    else if (arg instanceof Buffer) {
	                        cb(null, bufferLocal2Remote(arg));
	                    }
	                    else if (arg instanceof Error) {
	                        cb(null, errorLocal2Remote(arg));
	                    }
	                    else {
	                        cb(null, arg);
	                    }
	                    break;
	                default:
	                    cb(null, arg);
	                    break;
	            }
	        }