function traverseTree(treeNode) {
  function loop(node, result) {
    if (node.url) {
      result.push(node);
    } else if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        var item = node.children[i];
        loop(item, result);
      }
    }
    return result;
  }

  return loop(treeNode, []);
}