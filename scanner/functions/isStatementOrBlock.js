function isStatementOrBlock() {
	  if (this.parentPath.isLabeledStatement() || t.isBlockStatement(this.container)) {
	    return false;
	  } else {
	    return (0, _includes2.default)(t.STATEMENT_OR_BLOCK_KEYS, this.key);
	  }
	}