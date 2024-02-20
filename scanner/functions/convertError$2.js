function convertError$2(e, message) {
	    if ( message === void 0 ) message = e.toString();
	
	    switch (e.name) {
	        case "NotFoundError":
	            return new ApiError(ErrorCode.ENOENT, message);
	        case "QuotaExceededError":
	            return new ApiError(ErrorCode.ENOSPC, message);
	        default:
	            // The rest do not seem to map cleanly to standard error codes.
	            return new ApiError(ErrorCode.EIO, message);
	    }
	}