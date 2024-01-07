function _interfaceish(node) {
	  this.print(node.id, node);
	  this.print(node.typeParameters, node);
	  if (node.extends.length) {
	    this.space();
	    this.word("extends");
	    this.space();
	    this.printList(node.extends, node);
	  }
	  if (node.mixins && node.mixins.length) {
	    this.space();
	    this.word("mixins");
	    this.space();
	    this.printList(node.mixins, node);
	  }
	  this.space();
	  this.print(node.body, node);
	}