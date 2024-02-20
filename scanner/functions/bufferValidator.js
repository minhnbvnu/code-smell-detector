function bufferValidator(v, cb) {
	    if (Buffer.isBuffer(v)) {
	        cb();
	    }
	    else {
	        cb(new ApiError(ErrorCode.EINVAL, "option must be a Buffer."));
	    }
	}