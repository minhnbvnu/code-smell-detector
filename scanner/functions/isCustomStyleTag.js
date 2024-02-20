function isCustomStyleTag(node) {
  return node && !isText(node) && lists.contains(node.classList, 'note-styletag');
}