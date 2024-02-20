function AsyncMirror(sync, async, deprecateMsg) {
	        if ( deprecateMsg === void 0 ) deprecateMsg = true;
	
	        SynchronousFileSystem$$1.call(this);
	        /**
	         * Queue of pending asynchronous operations.
	         */
	        this._queue = [];
	        this._queueRunning = false;
	        this._isInitialized = false;
	        this._initializeCallbacks = [];
	        this._sync = sync;
	        this._async = async;
	        if (!sync.supportsSynch()) {
	            throw new Error("The first argument to AsyncMirror needs to be a synchronous file system.");
	        }
	        deprecationMessage(deprecateMsg, AsyncMirror.Name, { sync: "sync file system instance", async: "async file system instance" });
	    }