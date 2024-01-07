function insertBefore(nodes) {
	  this._assertUnremoved();

	  nodes = this._verifyNodeList(nodes);

	  if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
	    return this.parentPath.insertBefore(nodes);
	  } else if (this.isNodeType("Expression") || this.parentPath.isForStatement() && this.key === "init") {
	    if (this.node) nodes.push(this.node);
	    this.replaceExpressionWithStatements(nodes);
	  } else {
	    this._maybePopFromStatements(nodes);
	    if (Array.isArray(this.container)) {
	      return this._containerInsertBefore(nodes);
	    } else if (this.isStatementOrBlock()) {
	      if (this.node) nodes.push(this.node);
	      this._replaceWith(t.blockStatement(nodes));
	    } else {
	      throw new Error("We don't know what to do with this node type. " + "We were previously a Statement but we can't fit in here?");
	    }
	  }

	  return [this];
	}