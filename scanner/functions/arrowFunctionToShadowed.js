function arrowFunctionToShadowed() {
	  if (!this.isArrowFunctionExpression()) return;

	  this.ensureBlock();

	  var node = this.node;

	  node.expression = false;
	  node.type = "FunctionExpression";
	  node.shadow = node.shadow || true;
	}