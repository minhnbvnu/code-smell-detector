function canSwapBetweenExpressionAndStatement(replacement) {
	  if (this.key !== "body" || !this.parentPath.isArrowFunctionExpression()) {
	    return false;
	  }

	  if (this.isExpression()) {
	    return t.isBlockStatement(replacement);
	  } else if (this.isBlockStatement()) {
	    return t.isExpression(replacement);
	  }

	  return false;
	}