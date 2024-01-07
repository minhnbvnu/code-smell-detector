function readConstraint(node, objectStack) {
  const name = node.getAttribute('name');
  if (!name) {
    return undefined;
  }
  return pushParseAndPop({'name': name}, CONSTRAINT_PARSERS, node, objectStack);
}