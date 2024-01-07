function replaceWithMultiple(nodes) {
	  this.resync();

	  nodes = this._verifyNodeList(nodes);
	  t.inheritLeadingComments(nodes[0], this.node);
	  t.inheritTrailingComments(nodes[nodes.length - 1], this.node);
	  this.node = this.container[this.key] = null;
	  this.insertAfter(nodes);

	  if (this.node) {
	    this.requeue();
	  } else {
	    this.remove();
	  }
	}