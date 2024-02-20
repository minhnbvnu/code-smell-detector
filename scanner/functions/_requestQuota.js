function _requestQuota(type, size, success, errorCallback) {
	    // We cast navigator and window to '<any>' because everything here is
	    // nonstandard functionality, despite the fact that Chrome has the only
	    // implementation of the HTML5FS and is likely driving the standardization
	    // process. Thus, these objects defined off of navigator and window are not
	    // present in the DefinitelyTyped TypeScript typings for FileSystem.
	    if (typeof navigator['webkitPersistentStorage'] !== 'undefined') {
	        switch (type) {
	            case global$1.PERSISTENT:
	                navigator.webkitPersistentStorage.requestQuota(size, success, errorCallback);
	                break;
	            case global$1.TEMPORARY:
	                navigator.webkitTemporaryStorage.requestQuota(size, success, errorCallback);
	                break;
	            default:
	                errorCallback(new TypeError(("Invalid storage type: " + type)));
	                break;
	        }
	    }
	    else {
	        global$1.webkitStorageInfo.requestQuota(type, size, success, errorCallback);
	    }
	}