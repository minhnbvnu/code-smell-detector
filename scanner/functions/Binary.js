function Binary(node, parent) {
  if (node.operator === "**" && t.isBinaryExpression(parent, {
    operator: "**"
  })) {
    return parent.left === node;
  }

  if (isClassExtendsClause(node, parent)) {
    return true;
  }

  if (hasPostfixPart(node, parent) || t.isUnaryLike(parent) || t.isAwaitExpression(parent)) {
    return true;
  }

  if (t.isBinary(parent)) {
    const parentOp = parent.operator;
    const parentPos = PRECEDENCE[parentOp];
    const nodeOp = node.operator;
    const nodePos = PRECEDENCE[nodeOp];

    if (parentPos === nodePos && parent.right === node && !t.isLogicalExpression(parent) || parentPos > nodePos) {
      return true;
    }
  }
}