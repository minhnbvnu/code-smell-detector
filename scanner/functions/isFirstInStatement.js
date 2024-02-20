function isFirstInStatement(printStack, {
  considerArrow = false,
  considerDefaultExports = false
} = {}) {
  let i = printStack.length - 1;
  let node = printStack[i];
  i--;
  let parent = printStack[i];

  while (i >= 0) {
    if (t.isExpressionStatement(parent, {
      expression: node
    }) || considerDefaultExports && t.isExportDefaultDeclaration(parent, {
      declaration: node
    }) || considerArrow && t.isArrowFunctionExpression(parent, {
      body: node
    })) {
      return true;
    }

    if (hasPostfixPart(node, parent) && !t.isNewExpression(parent) || t.isSequenceExpression(parent) && parent.expressions[0] === node || t.isConditional(parent, {
      test: node
    }) || t.isBinary(parent, {
      left: node
    }) || t.isAssignmentExpression(parent, {
      left: node
    })) {
      node = parent;
      i--;
      parent = printStack[i];
    } else {
      return false;
    }
  }

  return false;
}