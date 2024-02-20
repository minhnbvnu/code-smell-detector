function visitMemberExpression(traverse, node, path, state) {
  traverse(node.object, path, state);
  utils.catchup(node.property.range[0] - 1, state);
  utils.append('[', state);
  utils.catchupWhiteSpace(node.property.range[0], state);
  utils.append('"', state);
  utils.catchup(node.property.range[1], state);
  utils.append('"]', state);
  return false;
}