function isBodyContainer(node) {
  return dom_isCell(node) || isBlockquote(node) || isEditable(node);
}