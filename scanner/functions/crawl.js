function crawl(node) {
	  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (t.isMemberExpression(node)) {
	    crawl(node.object, state);
	    if (node.computed) crawl(node.property, state);
	  } else if (t.isBinary(node) || t.isAssignmentExpression(node)) {
	    crawl(node.left, state);
	    crawl(node.right, state);
	  } else if (t.isCallExpression(node)) {
	    state.hasCall = true;
	    crawl(node.callee, state);
	  } else if (t.isFunction(node)) {
	    state.hasFunction = true;
	  } else if (t.isIdentifier(node)) {
	    state.hasHelper = state.hasHelper || isHelper(node.callee);
	  }

	  return state;
	}