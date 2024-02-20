function isModuleExportsMemberExpression(node) {
  return _.overSome([
    isExports,
    isModuleExports,
    function (node) {
      return node.type === 'MemberExpression' && isModuleExportsMemberExpression(node.object);
    }
  ])(node);
}