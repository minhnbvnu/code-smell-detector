function IfStatement(node) {
	  this.word("if");
	  this.space();
	  this.token("(");
	  this.print(node.test, node);
	  this.token(")");
	  this.space();

	  var needsBlock = node.alternate && t.isIfStatement(getLastStatement(node.consequent));
	  if (needsBlock) {
	    this.token("{");
	    this.newline();
	    this.indent();
	  }

	  this.printAndIndentOnComments(node.consequent, node);

	  if (needsBlock) {
	    this.dedent();
	    this.newline();
	    this.token("}");
	  }

	  if (node.alternate) {
	    if (this.endsWith("}")) this.space();
	    this.word("else");
	    this.space();
	    this.printAndIndentOnComments(node.alternate, node);
	  }
	}