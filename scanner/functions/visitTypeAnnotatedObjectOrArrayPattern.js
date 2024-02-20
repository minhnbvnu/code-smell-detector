function visitTypeAnnotatedObjectOrArrayPattern(traverse, node, path, state) {
  utils.catchup(node.typeAnnotation.range[0], state);
  utils.catchupWhiteOut(node.typeAnnotation.range[1], state);
  return false;
}