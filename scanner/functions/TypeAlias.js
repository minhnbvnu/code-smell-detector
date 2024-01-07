function TypeAlias(node) {
	  this.word("type");
	  this.space();
	  this.print(node.id, node);
	  this.print(node.typeParameters, node);
	  this.space();
	  this.token("=");
	  this.space();
	  this.print(node.right, node);
	  this.semicolon();
	}