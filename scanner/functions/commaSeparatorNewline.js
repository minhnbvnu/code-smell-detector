function commaSeparatorNewline() {
	  this.token(",");
	  this.newline();

	  if (!this.endsWith("\n")) this.space();
	}