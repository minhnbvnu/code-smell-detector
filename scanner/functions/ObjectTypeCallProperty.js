function ObjectTypeCallProperty(node) {
	  if (node.static) {
	    this.word("static");
	    this.space();
	  }
	  this.print(node.value, node);
	}