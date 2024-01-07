function getFunctionParent() {
	  return this.findParent(function (path) {
	    return path.isFunction() || path.isProgram();
	  });
	}