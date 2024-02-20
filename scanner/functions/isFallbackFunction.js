function isFallbackFunction(node) {
  return isFunctionDefinition(node) && (node.isFallback || node.isReceiveEther)
}