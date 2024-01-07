function _getQueueContexts() {
	  var path = this;
	  var contexts = this.contexts;
	  while (!contexts.length) {
	    path = path.parentPath;
	    contexts = path.contexts;
	  }
	  return contexts;
	}