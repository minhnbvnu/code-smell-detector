function DeclareExportDeclaration(node) {
	  this.word("declare");
	  this.space();
	  this.word("export");
	  this.space();
	  if (node.default) {
	    this.word("default");
	    this.space();
	  }

	  FlowExportDeclaration.apply(this, arguments);
	}