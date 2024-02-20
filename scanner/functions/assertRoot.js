function assertRoot(fs) {
	    if (fs) {
	        return fs;
	    }
	    throw new ApiError(ErrorCode.EIO, "Initialize BrowserFS with a file system using BrowserFS.initialize(filesystem)");
	}