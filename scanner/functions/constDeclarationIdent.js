function constDeclarationIdent() {
	  this.token(",");
	  this.newline();
	  if (this.endsWith("\n")) for (var i = 0; i < 6; i++) {
	    this.space(true);
	  }
	}