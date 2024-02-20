function getChildrenlength(children) {
	  var len = 1;
	  if (Array.isArray(children)) {
	    len = children.length;
	  }
	  return len;
	}