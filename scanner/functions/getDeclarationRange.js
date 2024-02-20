function getDeclarationRange(type, node, isStatement) {
  // `exports.a = 1`
  if (type === 'exports')
    return new ExportsRange(node, isStatement);

  // `module.exports = { ... key: value }`
  assert.equal(type, 'module.exports');
  return new ModuleRange(node);
}