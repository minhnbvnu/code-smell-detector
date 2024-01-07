function ClassBody(node) {
	  this.token("{");
	  this.printInnerComments(node);
	  if (node.body.length === 0) {
	    this.token("}");
	  } else {
	    this.newline();

	    this.indent();
	    this.printSequence(node.body, node);
	    this.dedent();

	    if (!this.endsWith("\n")) this.newline();

	    this.rightBrace();
	  }
	}