function DeclareOpaqueType(node, parent) {
	  if (!t.isDeclareExportDeclaration(parent)) {
	    this.word("declare");
	    this.space();
	  }
	  this.OpaqueType(node);
	}