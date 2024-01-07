function updateSiblingKeys(fromIndex, incrementBy) {
	  if (!this.parent) return;

	  var paths = _cache.path.get(this.parent);
	  for (var i = 0; i < paths.length; i++) {
	    var path = paths[i];
	    if (path.key >= fromIndex) {
	      path.key += incrementBy;
	    }
	  }
	}