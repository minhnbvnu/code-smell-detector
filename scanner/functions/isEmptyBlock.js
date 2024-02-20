function isEmptyBlock(node) {
  return _.size(node.body && node.body.statements) === 0
}