function sortTrees(trees) {
  return trees.sort(function (tree1, tree2) {
    return tree1.name.localeCompare(tree2.name);
  });
}