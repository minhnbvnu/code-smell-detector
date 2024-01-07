function toBlock(node, parent) {
	  if (t.isBlockStatement(node)) {
	    return node;
	  }

	  if (t.isEmptyStatement(node)) {
	    node = [];
	  }

	  if (!Array.isArray(node)) {
	    if (!t.isStatement(node)) {
	      if (t.isFunction(parent)) {
	        node = t.returnStatement(node);
	      } else {
	        node = t.expressionStatement(node);
	      }
	    }

	    node = [node];
	  }

	  return t.blockStatement(node);
	}