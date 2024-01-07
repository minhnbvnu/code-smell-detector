function TypeofTypeAnnotation(node) {
	  this.word("typeof");
	  this.space();
	  this.print(node.argument, node);
	}