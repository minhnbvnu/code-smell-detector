function DeclareModule(node) {
	  this.word("declare");
	  this.space();
	  this.word("module");
	  this.space();
	  this.print(node.id, node);
	  this.space();
	  this.print(node.body, node);
	}