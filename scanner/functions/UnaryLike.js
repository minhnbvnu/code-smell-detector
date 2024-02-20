function UnaryLike(node, parent) {
  return hasPostfixPart(node, parent) || t.isBinaryExpression(parent, {
    operator: "**",
    left: node
  }) || isClassExtendsClause(node, parent);
}