function toStatement(node, ignore) {
	  if (t.isStatement(node)) {
	    return node;
	  }

	  var mustHaveId = false;
	  var newType = void 0;

	  if (t.isClass(node)) {
	    mustHaveId = true;
	    newType = "ClassDeclaration";
	  } else if (t.isFunction(node)) {
	    mustHaveId = true;
	    newType = "FunctionDeclaration";
	  } else if (t.isAssignmentExpression(node)) {
	    return t.expressionStatement(node);
	  }

	  if (mustHaveId && !node.id) {
	    newType = false;
	  }

	  if (!newType) {
	    if (ignore) {
	      return false;
	    } else {
	      throw new Error("cannot turn " + node.type + " to a statement");
	    }
	  }

	  node.type = newType;

	  return node;
	}