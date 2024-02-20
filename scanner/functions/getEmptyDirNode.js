function getEmptyDirNode() {
	    if (emptyDirNode) {
	        return emptyDirNode;
	    }
	    return emptyDirNode = Buffer.from("{}");
	}