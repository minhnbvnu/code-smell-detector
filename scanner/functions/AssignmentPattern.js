function AssignmentPattern(node) {
	  this.print(node.left, node);
	  if (node.left.optional) this.token("?");
	  this.print(node.left.typeAnnotation, node);
	  this.space();
	  this.token("=");
	  this.space();
	  this.print(node.right, node);
	}