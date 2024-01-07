function DeclareClass(node, parent) {
	  if (!t.isDeclareExportDeclaration(parent)) {
	    this.word("declare");
	    this.space();
	  }
	  this.word("class");
	  this.space();
	  this._interfaceish(node);
	}