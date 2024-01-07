function QualifiedTypeIdentifier(node) {
	  this.print(node.qualification, node);
	  this.token(".");
	  this.print(node.id, node);
	}