function nodeContainsIndices(node, start, end) {
  if (node.startIndex < start) return node.endIndex >= end;
  if (node.startIndex === start) return node.endIndex > end;
  return false;
}