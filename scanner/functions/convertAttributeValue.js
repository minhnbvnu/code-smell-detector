function convertAttributeValue(node) {
	    if (t.isJSXExpressionContainer(node)) {
	      return node.expression;
	    } else {
	      return node;
	    }
	  }