function isProtoAssignmentExpression(node) {
	    var left = node.left;
	    return t.isMemberExpression(left) && t.isLiteral(t.toComputedKey(left, left.property), { value: "__proto__" });
	  }