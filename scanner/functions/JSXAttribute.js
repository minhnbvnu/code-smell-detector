function JSXAttribute(node) {
	  this.print(node.name, node);
	  if (node.value) {
	    this.token("=");
	    this.print(node.value, node);
	  }
	}