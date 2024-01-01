function isNode (node) {
  return node.tagName.toLowerCase() in knownTags || node.isNode;
}