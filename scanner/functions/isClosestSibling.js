function isClosestSibling(nodeA, nodeB) {
  return nodeA.nextSibling === nodeB || nodeA.previousSibling === nodeB;
}