function isHelper(node) {
	  if (t.isMemberExpression(node)) {
	    return isHelper(node.object) || isHelper(node.property);
	  } else if (t.isIdentifier(node)) {
	    return node.name === "require" || node.name[0] === "_";
	  } else if (t.isCallExpression(node)) {
	    return isHelper(node.callee);
	  } else if (t.isBinary(node) || t.isAssignmentExpression(node)) {
	    return t.isIdentifier(node.left) && isHelper(node.left) || isHelper(node.right);
	  } else {
	    return false;
	  }
	}