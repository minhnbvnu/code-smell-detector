function ExportDefaultDeclaration() {
	  this.word("export");
	  this.space();
	  this.word("default");
	  this.space();
	  ExportDeclaration.apply(this, arguments);
	}