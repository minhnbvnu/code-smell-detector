function TupleTypeAnnotation(node) {
	  this.token("[");
	  this.printList(node.types, node);
	  this.token("]");
	}