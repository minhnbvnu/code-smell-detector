function ResourceManager(hashTableNameToHandle, hashTableMap) {
	    if (hashTableNameToHandle === void 0) {
	      hashTableNameToHandle = {};
	    }

	    if (hashTableMap === void 0) {
	      hashTableMap = {};
	    }

	    this.hashTableNameToHandle = hashTableNameToHandle;
	    this.hashTableMap = hashTableMap;
	  }