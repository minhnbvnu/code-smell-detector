function getOuterFnExpr(funPath) {
	  var node = funPath.node;
	  t.assertFunction(node);

	  if (!node.id) {
	    // Default-exported function declarations, and function expressions may not
	    // have a name to reference, so we explicitly add one.
	    node.id = funPath.scope.parent.generateUidIdentifier("callee");
	  }

	  if (node.generator && // Non-generator functions don't need to be marked.
	  t.isFunctionDeclaration(node)) {
	    // Return the identifier returned by runtime.mark(<node.id>).
	    return getMarkedFunctionId(funPath);
	  }

	  return node.id;
	}