function LabeledStatement(node) {
	  this.print(node.label, node);
	  this.token(":");
	  this.space();
	  this.print(node.body, node);
	}