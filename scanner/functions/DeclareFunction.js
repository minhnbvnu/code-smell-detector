function DeclareFunction(node, parent) {
	  if (!t.isDeclareExportDeclaration(parent)) {
	    this.word("declare");
	    this.space();
	  }
	  this.word("function");
	  this.space();
	  this.print(node.id, node);
	  this.print(node.id.typeAnnotation.typeAnnotation, node);
	  this.semicolon();
	}