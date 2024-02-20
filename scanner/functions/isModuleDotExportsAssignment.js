function isModuleDotExportsAssignment(node) {
  if (!node || node.type !== 'AssignmentExpression') {
    return;
  }

  const {left} = node;

  // `module.exports = ...`
  if (isModuleDotExports(left)) {
    return true;
  }

  // `module.exports.whatever = ...`
  if (
    left.type === 'MemberExpression' &&
    left.object &&
    isModuleDotExports(left.object)
  ) {
    return true;
  }

  return false;
}