function isValidConstructor(node) {
  switch (node.name) {
    case 'Number':
    case 'String':
    case 'Boolean':
    case 'Math':
    case 'JSON':
      return false
    default:
      return true
  }
}