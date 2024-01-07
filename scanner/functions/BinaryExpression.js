function BinaryExpression(node) {
	  var operator = node.operator;

	  if (t.NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
	    return t.numberTypeAnnotation();
	  } else if (t.BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) {
	    return t.booleanTypeAnnotation();
	  } else if (operator === "+") {
	    var right = this.get("right");
	    var left = this.get("left");

	    if (left.isBaseType("number") && right.isBaseType("number")) {
	      return t.numberTypeAnnotation();
	    } else if (left.isBaseType("string") || right.isBaseType("string")) {
	      return t.stringTypeAnnotation();
	    }

	    return t.unionTypeAnnotation([t.stringTypeAnnotation(), t.numberTypeAnnotation()]);
	  }
	}