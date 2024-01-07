function FlowExportDeclaration(node) {
	  if (node.declaration) {
	    var declar = node.declaration;
	    this.print(declar, node);
	    if (!t.isStatement(declar)) this.semicolon();
	  } else {
	    this.token("{");
	    if (node.specifiers.length) {
	      this.space();
	      this.printList(node.specifiers, node);
	      this.space();
	    }
	    this.token("}");

	    if (node.source) {
	      this.space();
	      this.word("from");
	      this.space();
	      this.print(node.source, node);
	    }

	    this.semicolon();
	  }
	}