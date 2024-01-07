function isScope(node, parent) {
	  if (t.isBlockStatement(node) && t.isFunction(parent, { body: node })) {
	    return false;
	  }

	  return t.isScopable(node);
	}