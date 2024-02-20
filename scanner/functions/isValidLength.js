function isValidLength(str, limit) {
  return Buffer.byteLength(str, 'utf8') <= limit
}