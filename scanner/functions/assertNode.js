function assertNode(node) {
	  if (!isNode(node)) {
	    throw new TypeError("Not a valid node " + (node && node.type));
	  }
	}