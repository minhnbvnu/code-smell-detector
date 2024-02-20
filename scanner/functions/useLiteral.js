function useLiteral(node) {
  if (node.callee.type != 'Identifier' ||
      !canBeLiteral(node.callee) ||
      node.arguments.length > 0) {
    return node
  }

  return getNode(node.callee)
}