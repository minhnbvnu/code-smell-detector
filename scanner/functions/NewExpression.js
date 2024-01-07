function NewExpression(node) {
	  if (this.get("callee").isIdentifier()) {
	    return t.genericTypeAnnotation(node.callee);
	  }
	}