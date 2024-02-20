function NextTickQueue() {
	        this._queue = [];
	        this._draining = false;
	        // Used/assigned by the drainQueue function.
	        this._currentQueue = null;
	        this._queueIndex = -1;
	    }