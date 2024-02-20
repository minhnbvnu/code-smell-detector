function isValueOfProperty(node) {
  return (node.key.type === 'Identifier' && node.key.name === 'valueOf') ||
    (node.key.type === 'Literal' && node.key.value === 'valueOf');
}