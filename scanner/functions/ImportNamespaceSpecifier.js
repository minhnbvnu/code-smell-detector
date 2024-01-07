function ImportNamespaceSpecifier(node) {
	  this.token("*");
	  this.space();
	  this.word("as");
	  this.space();
	  this.print(node.local, node);
	}