function inShadow(key) {
	  var parentFn = this.isFunction() ? this : this.findParent(function (p) {
	    return p.isFunction();
	  });
	  if (!parentFn) return;

	  if (parentFn.isFunctionExpression() || parentFn.isFunctionDeclaration()) {
	    var shadow = parentFn.node.shadow;

	    if (shadow && (!key || shadow[key] !== false)) {
	      return parentFn;
	    }
	  } else if (parentFn.isArrowFunctionExpression()) {
	    return parentFn;
	  }

	  return null;
	}