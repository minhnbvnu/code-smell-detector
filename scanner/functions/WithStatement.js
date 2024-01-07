function WithStatement(node) {
	  this.word("with");
	  this.space();
	  this.token("(");
	  this.print(node.object, node);
	  this.token(")");
	  this.printBlock(node);
	}