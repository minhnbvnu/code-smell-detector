function getTypeHintFromInline(node, commentsByLine) {
  var key = node.loc.start.column - 1;
  var comments = commentsByLine[node.loc.start.line];
  if (!comments || !(key in comments)) {
    return null;
  }
  // annotate the node
  node.typeHint = comments[key].value;
  return node.typeHint;
}