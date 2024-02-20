function isReceiveFunction(node) {
  return isFunctionDefinition(node) && node.isReceiveEther
}