function getTypeHintParams(node, state) {
  // First look for typehints in the docblock.
  var typeHints = getTypeHintsFromDocBlock(node, state.docBlocksByLine);

  // If not found, look inline.
  if (!typeHints.params && node.params) {
    typeHints.params = node.params.map(function(param, index) {
      return [param.name, getTypeHintFromInline(param, state.commentsByLine)];
    }).filter(function(param) {
      return param[1];
    });
  }
  if (!typeHints.returns) {
    typeHints.returns = getTypeHintFromInline(node.body, state.commentsByLine);
  }

  return typeHints;
}