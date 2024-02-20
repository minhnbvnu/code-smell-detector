function recurseTree(tree, prefix, recurseFunc) {
  const treeLen = tree.length;
  const treeEnd = treeLen - 1;
  for (let i = 0; i < treeLen; i++) {
    const atEnd = i === treeEnd;
    recurseFunc(tree[i], prefix + getLastIndentChar(atEnd), prefix + getNextIndentChar(atEnd));
  }
}