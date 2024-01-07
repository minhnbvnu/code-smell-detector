function _maybePopFromStatements(nodes) {
	  var last = nodes[nodes.length - 1];
	  var isIdentifier = t.isIdentifier(last) || t.isExpressionStatement(last) && t.isIdentifier(last.expression);

	  if (isIdentifier && !this.isCompletionRecord()) {
	    nodes.pop();
	  }
	}