function findParent(callback) {
	  var path = this;
	  while (path = path.parentPath) {
	    if (callback(path)) return path;
	  }
	  return null;
	}