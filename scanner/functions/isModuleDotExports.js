function isModuleDotExports(node) {
  return (
    node.type === 'MemberExpression' &&
    node.object &&
    node.object.type === 'Identifier' &&
    node.object.name === 'module' &&
    node.property &&
    node.property.type === 'Identifier' &&
    node.property.name === 'exports'
  );
}