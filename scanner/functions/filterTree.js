function filterTree(tree, filters, pattern = '') {
  if (tree.children) {
    tree.children = tree.children.filter(child => filterTree(child, filters, pattern));
  }

  const notDim = tree.color !== 'dim';
  const hasChildren = tree.children == null ? false : tree.children.length > 0;
  const name = tree.name.slice(0, tree.name.lastIndexOf('@'));
  const found = micromatch.any(name, filters) || micromatch.contains(name, pattern);

  return notDim && (found || hasChildren);
}