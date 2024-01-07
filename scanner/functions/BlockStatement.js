function BlockStatement(node) {
	  this.token("{");
	  this.printInnerComments(node);

	  var hasDirectives = node.directives && node.directives.length;

	  if (node.body.length || hasDirectives) {
	    this.newline();

	    this.printSequence(node.directives, node, { indent: true });
	    if (hasDirectives) this.newline();

	    this.printSequence(node.body, node, { indent: true });
	    this.removeTrailingNewline();

	    this.source("end", node.loc);

	    if (!this.endsWith("\n")) this.newline();

	    this.rightBrace();
	  } else {
	    this.source("end", node.loc);
	    this.token("}");
	  }
	}