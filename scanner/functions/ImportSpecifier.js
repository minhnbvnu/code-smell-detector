function ImportSpecifier(node) {
	  if (node.importKind === "type" || node.importKind === "typeof") {
	    this.word(node.importKind);
	    this.space();
	  }

	  this.print(node.imported, node);
	  if (node.local && node.local.name !== node.imported.name) {
	    this.space();
	    this.word("as");
	    this.space();
	    this.print(node.local, node);
	  }
	}