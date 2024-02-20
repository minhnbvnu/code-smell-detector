function validateGeneralJwtFormat(token) {
  if (token.length === 0) {
    console.log('Missing token')
    return false
  }

  const parts = token.split('.')

  if (parts.length !== 3) {
    console.log('Invalid token format. Invalid number of parts.')
    return false
  }

  if (!parts.every((part) => part.length > 0)) {
    console.log('Invalid token format. Parts should not be empty.')
    return false
  }

  return true
}