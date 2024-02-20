function isPrimitiveData(x) {
  switch (typeof x) {
    case 'boolean':
    case 'number':
    case 'string':
      return true
    default:
      return false
  }
}