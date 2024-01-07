function UnaryLike(node, parent) {
	  return t.isMemberExpression(parent, { object: node }) || t.isCallExpression(parent, { callee: node }) || t.isNewExpression(parent, { callee: node });
	}