function isMemberExpressionSuper(node) {
	  return t.isMemberExpression(node) && t.isSuper(node.object);
	}