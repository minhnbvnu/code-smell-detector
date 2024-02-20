function SyncKeyValueFileSystem(options) {
	        SynchronousFileSystem$$1.call(this);
	        this.store = options.store;
	        // INVARIANT: Ensure that the root exists.
	        this.makeRootDirectory();
	    }