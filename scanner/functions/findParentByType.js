function findParentByType (node, type) {
  let parent = node.getParent()
  while (parent) {
    if (parent.isInstanceOf(type)) {
      return parent
    }
    parent = parent.getParent()
  }
}