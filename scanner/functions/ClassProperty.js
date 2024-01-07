function ClassProperty(node) {
	  this.printJoin(node.decorators, node);

	  if (node.static) {
	    this.word("static");
	    this.space();
	  }
	  if (node.computed) {
	    this.token("[");
	    this.print(node.key, node);
	    this.token("]");
	  } else {
	    this._variance(node);
	    this.print(node.key, node);
	  }
	  this.print(node.typeAnnotation, node);
	  if (node.value) {
	    this.space();
	    this.token("=");
	    this.space();
	    this.print(node.value, node);
	  }
	  this.semicolon();
	}