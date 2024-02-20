function compactTree(root) {
    (0, dfs_1.preOrder)(root, node => compactArray(node.children));
    return root;
}