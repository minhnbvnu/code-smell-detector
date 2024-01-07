function isCompletionRecord(allowInsideFunction) {
	  var path = this;
	  var first = true;

	  do {
	    var container = path.container;

	    if (path.isFunction() && !first) {
	      return !!allowInsideFunction;
	    }

	    first = false;

	    if (Array.isArray(container) && path.key !== container.length - 1) {
	      return false;
	    }
	  } while ((path = path.parentPath) && !path.isProgram());

	  return true;
	}