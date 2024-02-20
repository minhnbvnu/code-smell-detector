function validateArray (values) {
  const type = arrayType(values)
  if (type === 'mixed') {
    throw arrayOneTypeError()
  }
  return type
}