function isNode(node) {
	  return !!(node && _definitions.VISITOR_KEYS[node.type]);
	}