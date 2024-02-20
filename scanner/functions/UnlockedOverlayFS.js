function UnlockedOverlayFS(writable, readable) {
	        BaseFileSystem$$1.call(this);
	        this._isInitialized = false;
	        this._initializeCallbacks = [];
	        this._deletedFiles = {};
	        this._deleteLog = '';
	        // If 'true', we have scheduled a delete log update.
	        this._deleteLogUpdatePending = false;
	        // If 'true', a delete log update is needed after the scheduled delete log
	        // update finishes.
	        this._deleteLogUpdateNeeded = false;
	        // If there was an error updating the delete log...
	        this._deleteLogError = null;
	        this._writable = writable;
	        this._readable = readable;
	        if (this._writable.isReadOnly()) {
	            throw new ApiError(ErrorCode.EINVAL, "Writable file system must be writable.");
	        }
	    }