function _resolveEscapeSequences (value) {
  return value.replace(/\\\$/g, '$')
}