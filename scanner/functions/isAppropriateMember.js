function isAppropriateMember(node) {
  return node.object.type === 'Identifier' &&
    node.object.name === 'Symbol' &&
    node.property.type === 'Identifier';
}