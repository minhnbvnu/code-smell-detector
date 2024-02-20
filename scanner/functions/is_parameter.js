function is_parameter(token) {
  return token.data === 'in' ||
         token.data === 'inout' ||
         token.data === 'out'
}