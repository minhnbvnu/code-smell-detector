function ForStatement(node) {
	  this.word("for");
	  this.space();
	  this.token("(");

	  this.inForStatementInitCounter++;
	  this.print(node.init, node);
	  this.inForStatementInitCounter--;
	  this.token(";");

	  if (node.test) {
	    this.space();
	    this.print(node.test, node);
	  }
	  this.token(";");

	  if (node.update) {
	    this.space();
	    this.print(node.update, node);
	  }

	  this.token(")");
	  this.printBlock(node);
	}