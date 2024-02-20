function constructErrorCodeLookup() {
	    if (errorCodeLookup) {
	        return;
	    }
	    errorCodeLookup = {};
	    // This indicates a network transmission error on modern browsers. Internet Explorer might cause this code to be reported on some API server errors.
	    errorCodeLookup[Dropbox.ApiError.NETWORK_ERROR] = ErrorCode.EIO;
	    // This happens when the contentHash parameter passed to a Dropbox.Client#readdir or Dropbox.Client#stat matches the most recent content, so the API call response is omitted, to save bandwidth.
	    // errorCodeLookup[Dropbox.ApiError.NO_CONTENT];
	    // The error property on {Dropbox.ApiError#response} should indicate which input parameter is invalid and why.
	    errorCodeLookup[Dropbox.ApiError.INVALID_PARAM] = ErrorCode.EINVAL;
	    // The OAuth token used for the request will never become valid again, so the user should be re-authenticated.
	    errorCodeLookup[Dropbox.ApiError.INVALID_TOKEN] = ErrorCode.EPERM;
	    // This indicates a bug in dropbox.js and should never occur under normal circumstances.
	    // ^ Actually, that's false. This occurs when you try to move folders to themselves, or move a file over another file.
	    errorCodeLookup[Dropbox.ApiError.OAUTH_ERROR] = ErrorCode.EPERM;
	    // This happens when trying to read from a non-existing file, readdir a non-existing directory, write a file into a non-existing directory, etc.
	    errorCodeLookup[Dropbox.ApiError.NOT_FOUND] = ErrorCode.ENOENT;
	    // This indicates a bug in dropbox.js and should never occur under normal circumstances.
	    errorCodeLookup[Dropbox.ApiError.INVALID_METHOD] = ErrorCode.EINVAL;
	    // This happens when a Dropbox.Client#readdir or Dropbox.Client#stat call would return more than a maximum amount of directory entries.
	    errorCodeLookup[Dropbox.ApiError.NOT_ACCEPTABLE] = ErrorCode.EINVAL;
	    // This is used by some backend methods to indicate that the client needs to download server-side changes and perform conflict resolution. Under normal usage, errors with this code should never surface to the code using dropbox.js.
	    errorCodeLookup[Dropbox.ApiError.CONFLICT] = ErrorCode.EINVAL;
	    // Status value indicating that the application is making too many requests.
	    errorCodeLookup[Dropbox.ApiError.RATE_LIMITED] = ErrorCode.EBUSY;
	    // The request should be retried after some time.
	    errorCodeLookup[Dropbox.ApiError.SERVER_ERROR] = ErrorCode.EBUSY;
	    // Status value indicating that the user's Dropbox is over its storage quota.
	    errorCodeLookup[Dropbox.ApiError.OVER_QUOTA] = ErrorCode.ENOSPC;
	}