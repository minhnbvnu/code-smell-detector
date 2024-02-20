function isFirstArgument(node) {
  return Boolean(
    node.parent && node.parent.arguments && node.parent.arguments[0] === node
  )
}