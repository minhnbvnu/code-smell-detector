function needsParens(node, parent, printStack) {
	  if (!parent) return false;

	  if (t.isNewExpression(parent) && parent.callee === node) {
	    if (isOrHasCallExpression(node)) return true;
	  }

	  return find(expandedParens, node, parent, printStack);
	}