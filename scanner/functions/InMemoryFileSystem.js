function InMemoryFileSystem() {
	        SyncKeyValueFileSystem$$1.call(this, { store: new InMemoryStore() });
	    }