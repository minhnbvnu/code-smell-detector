function hasRest(node) {
	  return t.isRestElement(node.params[node.params.length - 1]);
	}