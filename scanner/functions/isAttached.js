function isAttached({ firstNode, lastNode }) {
  return firstNode.isConnected && lastNode.isConnected;
}