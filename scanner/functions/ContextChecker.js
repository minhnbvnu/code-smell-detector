function ContextChecker(contextName, checkStart, checkEnd) {
	    this.contextName = contextName;
	    this.openRange = null;
	    this.ranges = [];
	    this.checkStart = checkStart;
	    this.checkEnd = checkEnd;
	}