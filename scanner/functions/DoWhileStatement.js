function DoWhileStatement(node) {
	  this.word("do");
	  this.space();
	  this.print(node.body, node);
	  this.space();
	  this.word("while");
	  this.space();
	  this.token("(");
	  this.print(node.test, node);
	  this.token(")");
	  this.semicolon();
	}