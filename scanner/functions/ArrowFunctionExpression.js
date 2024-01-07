function ArrowFunctionExpression(node, parent) {
	  if (t.isExportDeclaration(parent) || t.isBinaryExpression(parent) || t.isLogicalExpression(parent) || t.isUnaryExpression(parent) || t.isTaggedTemplateExpression(parent)) {
	    return true;
	  }

	  return UnaryLike(node, parent);
	}