function ObjectTypeSpreadProperty(node) {
	  this.token("...");
	  this.print(node.argument, node);
	}