function destroyTree(root) {
  walk(root, (el) => cleanupAttributes(el));
}