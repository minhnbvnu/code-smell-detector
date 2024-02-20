function isComposite(g, u) {
  return 'children' in g && g.children(u).length;
}