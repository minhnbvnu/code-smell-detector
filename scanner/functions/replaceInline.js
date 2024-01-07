function replaceInline(nodes) {
	  this.resync();

	  if (Array.isArray(nodes)) {
	    if (Array.isArray(this.container)) {
	      nodes = this._verifyNodeList(nodes);
	      this._containerInsertAfter(nodes);
	      return this.remove();
	    } else {
	      return this.replaceWithMultiple(nodes);
	    }
	  } else {
	    return this.replaceWith(nodes);
	  }
	}