function OpaqueType(node) {
	  this.word("opaque");
	  this.space();
	  this.word("type");
	  this.space();
	  this.print(node.id, node);
	  this.print(node.typeParameters, node);
	  if (node.supertype) {
	    this.token(":");
	    this.space();
	    this.print(node.supertype, node);
	  }
	  if (node.impltype) {
	    this.space();
	    this.token("=");
	    this.space();
	    this.print(node.impltype, node);
	  }
	  this.semicolon();
	}