function getGlobalMap() {
	  var ns = getGlobalNamespace();

	  if (ns._tfGlobals == null) {
	    ns._tfGlobals = new Map();
	  }

	  return ns._tfGlobals;
	}