function astObjectIndexOfProperty(ast, key) {
  if (ast.properties && ast.properties.length) {
    for (const [i, propertyNode] of ast.properties.entries()) {
      if (
        (propertyNode.key.type === 'Identifier' ||
          propertyNode.key.type === 'Literal') &&
        (propertyNode.key.name || propertyNode.key.value) === key
      ) {
        return i;
      }
    }
  }
  return -1;
}