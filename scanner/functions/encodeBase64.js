function encodeBase64 (content) {
  return Buffer.from(content).toString('base64')
}