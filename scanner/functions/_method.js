function _method(node) {
	  var kind = node.kind;
	  var key = node.key;

	  if (kind === "method" || kind === "init") {
	    if (node.generator) {
	      this.token("*");
	    }
	  }

	  if (kind === "get" || kind === "set") {
	    this.word(kind);
	    this.space();
	  }

	  if (node.async) {
	    this.word("async");
	    this.space();
	  }

	  if (node.computed) {
	    this.token("[");
	    this.print(key, node);
	    this.token("]");
	  } else {
	    this.print(key, node);
	  }

	  this._params(node);
	  this.space();
	  this.print(node.body, node);
	}