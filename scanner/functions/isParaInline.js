function isParaInline(node) {
  return dom_isInline(node) && !!dom_ancestor(node, isPara);
}