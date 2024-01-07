function toExpression(node) {
	  if (t.isExpressionStatement(node)) {
	    node = node.expression;
	  }

	  if (t.isExpression(node)) {
	    return node;
	  }

	  if (t.isClass(node)) {
	    node.type = "ClassExpression";
	  } else if (t.isFunction(node)) {
	    node.type = "FunctionExpression";
	  }

	  if (!t.isExpression(node)) {
	    throw new Error("cannot turn " + node.type + " to an expression");
	  }

	  return node;
	}