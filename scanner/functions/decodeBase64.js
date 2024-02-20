function decodeBase64 (encodeStr) {
  return Buffer.from(encodeStr, 'base64').toString()
}