function JSXSpreadAttribute(node) {
	  this.token("{");
	  this.token("...");
	  this.print(node.argument, node);
	  this.token("}");
	}