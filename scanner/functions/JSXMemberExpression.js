function JSXMemberExpression(node) {
	  this.print(node.object, node);
	  this.token(".");
	  this.print(node.property, node);
	}