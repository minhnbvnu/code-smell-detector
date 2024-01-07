function DeclareVariable(node, parent) {
	  if (!t.isDeclareExportDeclaration(parent)) {
	    this.word("declare");
	    this.space();
	  }
	  this.word("var");
	  this.space();
	  this.print(node.id, node);
	  this.print(node.id.typeAnnotation, node);
	  this.semicolon();
	}