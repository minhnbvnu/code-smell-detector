function inferAnnotationFromBinaryExpression(name, path) {
	  var operator = path.node.operator;

	  var right = path.get("right").resolve();
	  var left = path.get("left").resolve();

	  var target = void 0;
	  if (left.isIdentifier({ name: name })) {
	    target = right;
	  } else if (right.isIdentifier({ name: name })) {
	    target = left;
	  }
	  if (target) {
	    if (operator === "===") {
	      return target.getTypeAnnotation();
	    } else if (t.BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
	      return t.numberTypeAnnotation();
	    } else {
	      return;
	    }
	  } else {
	    if (operator !== "===") return;
	  }

	  var typeofPath = void 0;
	  var typePath = void 0;
	  if (left.isUnaryExpression({ operator: "typeof" })) {
	    typeofPath = left;
	    typePath = right;
	  } else if (right.isUnaryExpression({ operator: "typeof" })) {
	    typeofPath = right;
	    typePath = left;
	  }
	  if (!typePath && !typeofPath) return;

	  typePath = typePath.resolve();
	  if (!typePath.isLiteral()) return;

	  var typeValue = typePath.node.value;
	  if (typeof typeValue !== "string") return;

	  if (!typeofPath.get("argument").isIdentifier({ name: name })) return;

	  return t.createTypeAnnotationBasedOnTypeof(typePath.node.value);
	}