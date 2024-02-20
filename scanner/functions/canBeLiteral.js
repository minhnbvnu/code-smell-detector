function canBeLiteral(node) {
  switch (node.name) {
    case 'Array':
    case 'Object':
      return true
    default:
      return false
  }
}