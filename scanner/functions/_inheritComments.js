function _inheritComments(key, child, parent) {
	  if (child && parent) {
	    child[key] = (0, _uniq2.default)([].concat(child[key], parent[key]).filter(Boolean));
	  }
	}