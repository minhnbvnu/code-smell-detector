function getAncestry() {
	  var path = this;
	  var paths = [];
	  do {
	    paths.push(path);
	  } while (path = path.parentPath);
	  return paths;
	}