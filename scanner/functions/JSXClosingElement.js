function JSXClosingElement(node) {
	  this.token("</");
	  this.print(node.name, node);
	  this.token(">");
	}