function MountableFileSystem() {
	        BaseFileSystem$$1.call(this);
	        // Contains the list of mount points in mntMap, sorted by string length in decreasing order.
	        // Ensures that we scan the most specific mount points for a match first, which lets us
	        // nest mount points.
	        this.mountList = [];
	        this.mntMap = {};
	        // The InMemory file system serves purely to provide directory listings for
	        // mounted file systems.
	        this.rootFs = new InMemoryFileSystem();
	    }