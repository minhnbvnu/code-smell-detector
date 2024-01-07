function ExportNamespaceSpecifier(node) {
	  this.token("*");
	  this.space();
	  this.word("as");
	  this.space();
	  this.print(node.exported, node);
	}