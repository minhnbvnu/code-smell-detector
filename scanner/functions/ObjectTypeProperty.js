function ObjectTypeProperty(node) {
	  if (node.static) {
	    this.word("static");
	    this.space();
	  }
	  this._variance(node);
	  this.print(node.key, node);
	  if (node.optional) this.token("?");
	  this.token(":");
	  this.space();
	  this.print(node.value, node);
	}