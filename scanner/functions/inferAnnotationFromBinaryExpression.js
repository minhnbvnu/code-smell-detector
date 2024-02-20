function inferAnnotationFromBinaryExpression(name, path) {
  const operator = path.node.operator;
  const right = path.get("right").resolve();
  const left = path.get("left").resolve();
  let target;

  if (left.isIdentifier({
    name
  })) {
    target = right;
  } else if (right.isIdentifier({
    name
  })) {
    target = left;
  }

  if (target) {
    if (operator === "===") {
      return target.getTypeAnnotation();
    }

    if (t.BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
      return t.numberTypeAnnotation();
    }

    return;
  }

  if (operator !== "===" && operator !== "==") return;
  let typeofPath;
  let typePath;

  if (left.isUnaryExpression({
    operator: "typeof"
  })) {
    typeofPath = left;
    typePath = right;
  } else if (right.isUnaryExpression({
    operator: "typeof"
  })) {
    typeofPath = right;
    typePath = left;
  }

  if (!typeofPath) return;
  if (!typeofPath.get("argument").isIdentifier({
    name
  })) return;
  typePath = typePath.resolve();
  if (!typePath.isLiteral()) return;
  const typeValue = typePath.node.value;
  if (typeof typeValue !== "string") return;
  return t.createTypeAnnotationBasedOnTypeof(typeValue);
}