function variableDeclarationIdent() {
	  this.token(",");
	  this.newline();
	  if (this.endsWith("\n")) for (var i = 0; i < 4; i++) {
	    this.space(true);
	  }
	}