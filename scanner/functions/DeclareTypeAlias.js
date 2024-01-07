function DeclareTypeAlias(node) {
	  this.word("declare");
	  this.space();
	  this.TypeAlias(node);
	}