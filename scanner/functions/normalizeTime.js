function normalizeTime(time) {
	    if (time instanceof Date) {
	        return time;
	    }
	    else if (typeof time === 'number') {
	        return new Date(time * 1000);
	    }
	    else {
	        throw new ApiError(ErrorCode.EINVAL, "Invalid time.");
	    }
	}