function ObjectTypeIndexer(node) {
	  if (node.static) {
	    this.word("static");
	    this.space();
	  }
	  this._variance(node);
	  this.token("[");
	  this.print(node.id, node);
	  this.token(":");
	  this.space();
	  this.print(node.key, node);
	  this.token("]");
	  this.token(":");
	  this.space();
	  this.print(node.value, node);
	}