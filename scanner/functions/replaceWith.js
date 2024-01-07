function replaceWith(replacement) {
	  this.resync();

	  if (this.removed) {
	    throw new Error("You can't replace this node, we've already removed it");
	  }

	  if (replacement instanceof _index4.default) {
	    replacement = replacement.node;
	  }

	  if (!replacement) {
	    throw new Error("You passed `path.replaceWith()` a falsy node, use `path.remove()` instead");
	  }

	  if (this.node === replacement) {
	    return;
	  }

	  if (this.isProgram() && !t.isProgram(replacement)) {
	    throw new Error("You can only replace a Program root node with another Program node");
	  }

	  if (Array.isArray(replacement)) {
	    throw new Error("Don't use `path.replaceWith()` with an array of nodes, use `path.replaceWithMultiple()`");
	  }

	  if (typeof replacement === "string") {
	    throw new Error("Don't use `path.replaceWith()` with a source string, use `path.replaceWithSourceString()`");
	  }

	  if (this.isNodeType("Statement") && t.isExpression(replacement)) {
	    if (!this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement) && !this.parentPath.isExportDefaultDeclaration()) {
	      replacement = t.expressionStatement(replacement);
	    }
	  }

	  if (this.isNodeType("Expression") && t.isStatement(replacement)) {
	    if (!this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement)) {
	      return this.replaceExpressionWithStatements([replacement]);
	    }
	  }

	  var oldNode = this.node;
	  if (oldNode) {
	    t.inheritsComments(replacement, oldNode);
	    t.removeComments(oldNode);
	  }

	  this._replaceWith(replacement);
	  this.type = replacement.type;

	  this.setScope();

	  this.requeue();
	}