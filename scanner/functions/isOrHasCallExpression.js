function isOrHasCallExpression(node) {
	  if (t.isCallExpression(node)) {
	    return true;
	  }

	  if (t.isMemberExpression(node)) {
	    return isOrHasCallExpression(node.object) || !node.computed && isOrHasCallExpression(node.property);
	  } else {
	    return false;
	  }
	}