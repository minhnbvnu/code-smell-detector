function isCreateClass(node) {
	    if (!node || !t.isCallExpression(node)) return false;

	    if (!isCreateClassCallExpression(node.callee) && !isCreateClassAddon(node.callee)) return false;

	    var args = node.arguments;
	    if (args.length !== 1) return false;

	    var first = args[0];
	    if (!t.isObjectExpression(first)) return false;

	    return true;
	  }