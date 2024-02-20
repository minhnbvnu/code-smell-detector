function _shouldMungeIdentifier(node, state) {
  return (
    !!state.methodFuncNode &&
    !utils.getDocblock(state).hasOwnProperty('preventMunge') &&
    /^_(?!_)/.test(node.name)
  );
}