function Binary(node, parent) {
	  if ((t.isCallExpression(parent) || t.isNewExpression(parent)) && parent.callee === node || t.isUnaryLike(parent) || t.isMemberExpression(parent) && parent.object === node || t.isAwaitExpression(parent)) {
	    return true;
	  }

	  if (t.isBinary(parent)) {
	    var parentOp = parent.operator;
	    var parentPos = PRECEDENCE[parentOp];

	    var nodeOp = node.operator;
	    var nodePos = PRECEDENCE[nodeOp];

	    if (parentPos === nodePos && parent.right === node && !t.isLogicalExpression(parent) || parentPos > nodePos) {
	      return true;
	    }
	  }

	  return false;
	}