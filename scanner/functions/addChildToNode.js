function addChildToNode(node, child) {
    child.parent = node;
    node.children.push(child);
    return child;
  }