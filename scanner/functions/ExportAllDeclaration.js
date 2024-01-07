function ExportAllDeclaration(node) {
	  this.word("export");
	  this.space();
	  this.token("*");
	  this.space();
	  this.word("from");
	  this.space();
	  this.print(node.source, node);
	  this.semicolon();
	}