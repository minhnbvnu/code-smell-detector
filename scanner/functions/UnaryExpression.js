function UnaryExpression(node) {
	  var operator = node.operator;

	  if (operator === "void") {
	    return t.voidTypeAnnotation();
	  } else if (t.NUMBER_UNARY_OPERATORS.indexOf(operator) >= 0) {
	    return t.numberTypeAnnotation();
	  } else if (t.STRING_UNARY_OPERATORS.indexOf(operator) >= 0) {
	    return t.stringTypeAnnotation();
	  } else if (t.BOOLEAN_UNARY_OPERATORS.indexOf(operator) >= 0) {
	    return t.booleanTypeAnnotation();
	  }
	}