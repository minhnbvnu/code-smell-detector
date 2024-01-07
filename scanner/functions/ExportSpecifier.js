function ExportSpecifier(node) {
	  this.print(node.local, node);
	  if (node.exported && node.local.name !== node.exported.name) {
	    this.space();
	    this.word("as");
	    this.space();
	    this.print(node.exported, node);
	  }
	}