function is_precision(token) {
  return token.data === 'highp' ||
         token.data === 'mediump' ||
         token.data === 'lowp'
}