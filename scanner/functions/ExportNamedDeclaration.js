function ExportNamedDeclaration() {
	  this.word("export");
	  this.space();
	  ExportDeclaration.apply(this, arguments);
	}