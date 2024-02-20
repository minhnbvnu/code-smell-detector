function isConst(node) {
  return ['pure', 'view', 'constant'].includes(node.stateMutability)
}