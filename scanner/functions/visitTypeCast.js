function visitTypeCast(traverse, node, path, state) {
  path.unshift(node);
  traverse(node.expression, path, state);
  path.shift();

  utils.catchup(node.typeAnnotation.range[0], state);
  utils.catchupWhiteOut(node.typeAnnotation.range[1], state);
  return false;
}