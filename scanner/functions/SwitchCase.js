function SwitchCase(node) {
	  if (node.test) {
	    this.word("case");
	    this.space();
	    this.print(node.test, node);
	    this.token(":");
	  } else {
	    this.word("default");
	    this.token(":");
	  }

	  if (node.consequent.length) {
	    this.newline();
	    this.printSequence(node.consequent, node, { indent: true });
	  }
	}