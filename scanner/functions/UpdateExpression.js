function UpdateExpression(node) {
	  var operator = node.operator;
	  if (operator === "++" || operator === "--") {
	    return t.numberTypeAnnotation();
	  }
	}