function Program(node) {
	  this.printInnerComments(node, false);

	  this.printSequence(node.directives, node);
	  if (node.directives && node.directives.length) this.newline();

	  this.printSequence(node.body, node);
	}