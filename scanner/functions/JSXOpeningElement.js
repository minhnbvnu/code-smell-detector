function JSXOpeningElement(node) {
	  this.token("<");
	  this.print(node.name, node);
	  if (node.attributes.length > 0) {
	    this.space();
	    this.printJoin(node.attributes, node, { separator: spaceSeparator });
	  }
	  if (node.selfClosing) {
	    this.space();
	    this.token("/>");
	  } else {
	    this.token(">");
	  }
	}