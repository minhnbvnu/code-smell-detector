function canHaveVariableDeclarationOrExpression() {
	  return (this.key === "init" || this.key === "left") && this.parentPath.isFor();
	}