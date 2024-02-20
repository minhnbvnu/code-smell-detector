function getAllParams(node, state) {
  if (type.shouldTransformFile(state, utils.getDocblock(state))) {
    return getTypeHintParams(node, state);
  }
  return {};
}