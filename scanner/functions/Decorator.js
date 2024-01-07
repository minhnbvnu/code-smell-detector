function Decorator(node) {
	  this.token("@");
	  this.print(node.expression, node);
	  this.newline();
	}