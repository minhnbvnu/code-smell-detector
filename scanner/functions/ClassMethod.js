function ClassMethod(node) {
	  this.printJoin(node.decorators, node);

	  if (node.static) {
	    this.word("static");
	    this.space();
	  }

	  if (node.kind === "constructorCall") {
	    this.word("call");
	    this.space();
	  }

	  this._method(node);
	}