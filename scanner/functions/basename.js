function basename(path) {
	  var SEPARATOR = '/';
	  path = path.trim();

	  while (path.endsWith(SEPARATOR)) {
	    path = path.slice(0, path.length - 1);
	  }

	  var items = path.split(SEPARATOR);
	  return items[items.length - 1];
	}