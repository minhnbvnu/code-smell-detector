function CatchClause(node) {
	  this.word("catch");
	  this.space();
	  this.token("(");
	  this.print(node.param, node);
	  this.token(")");
	  this.space();
	  this.print(node.body, node);
	}