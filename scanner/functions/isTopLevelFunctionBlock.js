function isTopLevelFunctionBlock(node) {
  // exception for UMD blocks
  return !(node.params.length === 1 && node.params[0].name === "factory") &&
    // regular IFEE
    (isOfType(node.parent, 'CallExpression') ||
    // module.exports assignment
    isOfType(node.parent, 'AssignmentExpression')) &&
    !isOfType(node.parent.callee, 'MemberExpression') &&
    isOfType(node.parent.parent, 'ExpressionStatement') &&
    isOfType(node.parent.parent.parent, 'Program');
}