function MemberExpression(node) {
	  this.print(node.object, node);

	  if (!node.computed && t.isMemberExpression(node.property)) {
	    throw new TypeError("Got a MemberExpression for MemberExpression property");
	  }

	  var computed = node.computed;
	  if (t.isLiteral(node.property) && typeof node.property.value === "number") {
	    computed = true;
	  }

	  if (computed) {
	    this.token("[");
	    this.print(node.property, node);
	    this.token("]");
	  } else {
	    this.token(".");
	    this.print(node.property, node);
	  }
	}