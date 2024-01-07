function TryStatement(node) {
	  this.word("try");
	  this.space();
	  this.print(node.block, node);
	  this.space();

	  if (node.handlers) {
	    this.print(node.handlers[0], node);
	  } else {
	    this.print(node.handler, node);
	  }

	  if (node.finalizer) {
	    this.space();
	    this.word("finally");
	    this.space();
	    this.print(node.finalizer, node);
	  }
	}